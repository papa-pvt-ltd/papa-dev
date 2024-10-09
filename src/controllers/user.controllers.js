import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { User } from "../models/user.models.js";
//
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//

import doten from "dotenv";
doten.config();

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  // const {fullName} = req.body
  // console.log(username, email, fullName, password, role);

  if (
    // check for full name
    [ email, username, password, role].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // doB
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    // fullName,
    role,
    password: hashedPassword,
  });

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));

  //
});

const Key_Secret = process.env.Key_Secret;
// console.log("secret key is ", Key_Secret);

const longinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password or user credintials");
  }

  const token = jwt.sign({ userId: user._id }, Key_Secret, {
    expiresIn: "2h",
  });

  const loggedInUser = await User.findById(user._id);
  const roleOfUser = loggedInUser.role;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
        role: roleOfUser,
        token,
      },
      "user logged in successfully"
    )
  );
});

const getAllUsers = asyncHandler(async (req, res) => {
  // need to modify
  const users = await User.find();
  if (!users) {
    throw new ApiResponse(400, "No users found");
  }
  res
    .status(200)
    .send(new ApiResponse(201, users, "users fetched successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  // const { oldPassword, newPassword } = req.body;
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  // const checkIfOldPasswordValid = await bcrypt.compare(
  //   oldPassword,
  //   user.password
  // );
  // if (!checkIfOldPasswordValid) {
  //   throw new ApiError(404, "old password does not match");
  // }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  return res
    .status(200)
    .send(new ApiResponse(201, user, "password changed successfully"));
});
const getFeild = (req,res)=>{
  try {
    const name = req.body
    console.log(name)
    return res.send (name)
  } catch (error) {
    console.log('err is ', error)
  }
}

export { registerUser, longinUser, getAllUsers, changeCurrentPassword };
