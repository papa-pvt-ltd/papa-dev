const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/User")

dotenv.config();

const SecretKey = process.env.WhatIsUserName;

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(400).json("email already taken");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();

    res.status(200).json({ message: "register succuesfully...!" });
    console.log("Register");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, SecretKey, {
      expiresIn: "2h",
    });

    const userId = user._id;

    res.status(200).json({ message: "login successfully", token, userId });
    console.log(email, "this is token:", token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().populate("firm");
    if (!user) {
      res.status(404).json({ message: "venders not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const singleUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const singleValue = await User.findById(userId).populate('Address');
    if (!singleValue) {
      res.status(404).json({ message: "vender not found" });
    }

    res.status(200).json({ userId, singleValue });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { userRegister, userLogin, getAllUsers, singleUser };
