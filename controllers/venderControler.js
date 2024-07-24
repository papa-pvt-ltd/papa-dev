const express = require("express");
const Vender = require("../models/Vender");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const SecretKey = process.env.whatIsYourCompany;

const venderRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const venderEmail = await Vender.findOne({ email });
    if (venderEmail) {
      return res.status(400).json("email already taken");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newVender = new Vender({
      username,
      email,
      password: hashPassword,
    });
    await newVender.save();

    res.status(200).json({ message: "register succuesfully...!" });
    // console.log("Register");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const venderLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vender = await Vender.findOne({ email });
    if (!vender || !(await bcrypt.compare(password, vender.password))) {
      return res.status(401).json({ message: "invalid username or password" });
    }

    const token = jwt.sign({ venderId: vender._id }, SecretKey, {
      expiresIn: "2h",
    });

    const venderId = vender._id;

    res.status(200).json({ message: "login successfully", token, venderId });
    // console.log(email, "this is token:", token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getAllVenders = async (req, res) => {
  try {
    const venders = await Vender.find().populate("firm");
    if (!venders) {
      res.status(404).json({ message: "venders not found" });
    }
    res.json({ venders });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const singleVender = async (req, res) => {
  const venderId = req.params.venderId;
  console.log(venderId)
  try {
    const singleValue = await Vender.findById(venderId).populate('firm');
    console.log(singleValue)
    if (!singleValue) {
      res.status(404).json({ message: "vender not found" });
    }

    const vendorFirmId = singleValue.firm[0]._id;
    const VenderBrandName = singleValue.firm[0].brandName;
    // console.log(vendorFirmId);
    res.status(200).json({ venderId, vendorFirmId,singleValue,VenderBrandName });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { venderRegister, venderLogin, getAllVenders, singleVender };
