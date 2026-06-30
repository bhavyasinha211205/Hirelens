import { getChatResponse } from "../services/geminiService.js";

export const chatController = async (req, res) => {

  try {

    const { message } = req.body;

    const reply = await getChatResponse(message);

    res.json({ reply });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};