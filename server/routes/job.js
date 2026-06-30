import express from "express";
import Job from "../models/Job.js";
import Resume from "../models/Resume.js";

import { analyzeJD } from "../ai/jdAnalyzer.js";
import { calculateATSScore } from "../ai/atsEngine.js";

const router = express.Router();

/* ==========================
   CREATE JOB
========================== */

router.post("/create", async (req, res) => {
  try {
    const { recruiterId, title, description } = req.body;

    const parsedJD = await analyzeJD(description);

    const job = new Job({
      recruiterId,
      title,
      description,
      parsedJD,
    });

    await job.save();

    res.status(201).json(job);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

/* ==========================
   ANALYZE ALL RESUMES
========================== */

router.post("/:jobId/analyze", async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        msg: "Job not found",
      });
    }

    const resumes = await Resume.find({
      jobId,
    });

    const leaderboard = await Promise.all(
      resumes.map(async (resume) => {
        const result = await calculateATSScore(
          job.parsedJD,
          resume.parsedResume,
        );

        return {
          id: resume._id,

          name: resume.parsedResume.name,

          email: resume.parsedResume.email,

          score: result.atsScore,

          breakdown: result.breakdown,

          matchedSkills: result.matchedSkills,

          missingSkills: result.missingSkills,

          phone: resume.parsedResume.phone,

          education: resume.parsedResume.education,

          experience: resume.parsedResume.experience,

          projects: resume.parsedResume.projects,
        };
      }),
    );

    leaderboard.sort((a, b) => b.score - a.score);

    res.json(leaderboard);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});
/* ==========================
   DASHBOARD
========================== */

router.get("/dashboard/:recruiterId", async (req, res) => {
  try {
    const { recruiterId } = req.params;

    const jobs = await Job.find({ recruiterId }).sort({
      createdAt: -1,
    });

    const activeJobs = jobs.filter(
      (job) => job.status === "active"
    ).length;

    const pausedJobs = jobs.filter(
      (job) => job.status === "paused"
    ).length;

    const closedJobs = jobs.filter(
      (job) => job.status === "closed"
    ).length;

    const totalJobs = jobs.length;

    const totalResumes = await Resume.countDocuments({
      recruiterId,
    });

    const recentJobs = await Promise.all(
      jobs.slice(0, 5).map(async (job) => {
        const resumeCount = await Resume.countDocuments({
          jobId: job._id,
        });

        return {
          _id: job._id,
          title: job.title,
          status: job.status,
          createdAt: job.createdAt,
          resumeCount,
        };
      })
    );

    res.json({
      activeJobs,
      pausedJobs,
      closedJobs,
      totalJobs,
      totalResumes,
      recentJobs,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});
/* ==========================
   GET ALL JOBS
========================== */

router.get("/:recruiterId", async (req, res) => {
  try {
    const { recruiterId } = req.params;

    const jobs = await Job.find({
      recruiterId,
    }).sort({
      createdAt: -1,
    });

    const jobsWithResumeCount = await Promise.all(
      jobs.map(async (job) => {
        const resumeCount = await Resume.countDocuments({
          jobId: job._id,
        });

        return {
          _id: job._id,
          title: job.title,
          status: job.status,
          createdAt: job.createdAt,
          resumeCount,
        };
      })
    );

    res.json(jobsWithResumeCount);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});
router.patch("/:jobId/status", async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status } = req.body;

    if (!["active", "paused", "closed"].includes(status)) {
      return res.status(400).json({
        msg: "Invalid status",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        msg: "Job not found",
      });
    }

    job.status = status;

    await job.save();

    res.json({
      msg: "Job status updated successfully",
      job,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

export default router;