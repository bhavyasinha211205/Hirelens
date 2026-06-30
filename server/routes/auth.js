import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";

dotenv.config();

const router = express.Router();

/* ===========================
   SIGNUP
=========================== */
router.post("/signup", async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({
        msg: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      msg: "User created successfully",
    });
  } catch (err) {
    console.error("Signup Error:", err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

/* ===========================
   LOGIN
=========================== */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        msg: "Please enter username and password",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        msg: "User not found",
      });
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.status(400).json({
        msg: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

export default router;
