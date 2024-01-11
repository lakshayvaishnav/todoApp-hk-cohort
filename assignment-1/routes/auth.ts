// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
// const express = require('express');
import express from "express";
// const { authenticateJwt, SECRET } = require("../middleware/");
import { authenticateJwt, SECRET } from "../middleware";
// const { User } = require("../db");
import { z } from "zod";
import { User } from "../db";
const router = express.Router();

let signupInput = z.object({
  username: z.string().min(20).max(30),
  password: z.string().min(6).max(10),
});

let loginInput = z.object({
  username: z.string().min(20).max(30),
  password: z.string().min(6).max(10),
});

router.post("/signup", async (req, res) => {
  const parsedInput = signupInput.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({
      error: parsedInput.error,
    });
    return;
  }
  const username = parsedInput.data.username;
  const password = parsedInput.data.password;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "User created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const parsedInput = loginInput.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({ error: parsedInput.error });
    return;
  }
  const username = parsedInput.data.username;
  const password = parsedInput.data.password;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.get("/me", authenticateJwt, async (req, res) => {
  const userId = req.headers["userId"];
  const user = await User.findOne({ _id: userId });
  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(403).json({ message: "User not logged in" });
  }
});

// module.exports = router;
export default router;
