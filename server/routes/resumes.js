import express from "express";
import multer from "multer";

import Resume from "../models/Resume.js";
import fs from "fs";
import path from "path";
import { extractPdfText } from "../utils/extractPdfText.js";
import { analyzeResume } from "../ai/resumeAnalyzer.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.array("resumes", 20), async (req, res) => {
  try {
    const { recruiterId, jobId } = req.body;

    const savedFiles = [];

    for (const file of req.files) {
      // Extract text
      const extractedText = await extractPdfText(file.path);

      // Gemini parsing
      const parsedResume = await analyzeResume(extractedText);

      // Save
      const resume = new Resume({
        recruiterId,
        jobId,
        fileName: file.originalname,
        filePath: file.path,
        extractedText,
        parsedResume,
      });

      await resume.save();

      savedFiles.push(resume);
    }

    res.status(201).json(savedFiles);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});
/* ==========================
   DELETE RESUME
========================== */

router.delete("/:resumeId", async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        msg: "Resume not found",
      });
    }

    // Delete PDF from uploads folder
    const filePath = path.join(process.cwd(), resume.filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete Mongo document
    await Resume.findByIdAndDelete(resumeId);

    res.json({
      msg: "Resume deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

export default router;
