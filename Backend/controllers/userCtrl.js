const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//! user Controller

const userCtrl = {
  //* Register user
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // ? check user  entered all credentials
    if (!username || !email || !password) {
      throw new Error("Please add all fields");
    }

    //? check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }
    //? hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //? create new user
    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    //? display new user
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  //* Login user
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //? check if user is exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }
    //? match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    //? generate token
    const token = jwt.sign({ id: user._id }, "token", { expiresIn: "30d" });

    //? display the user
    res.json({
      message: "Login Success",
      token,
      username: user.username,
      id: user._id,
      email: user.email,
    });
  }),
  //* Profile user
  profile: asyncHandler(async (req, res) => {
    //? find user by id using the token
    const user = await User.findById(req.user);

    //? display the user
    res.json({
      message: "User Profile",
      id: user._id,
      email: user.email,
    });
  }),
  //* Change Password
  changePassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    //? find user by id using the token
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User does not found");
    }
    //? hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    //? update password
    user.password = hashedPassword;
    //? save the updated user
    await user.save({
      validateBeforeSave: false
    });
    //? display the response to the  user
    res.json({
      message: "User Password changed successfully",
    });
  }),
  //* Update Profile
  updateUser: asyncHandler(async (req, res) => {
    const { email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
      },
      {
        new: true,
      }
    );
    res.json({ message: "User profile updated successfully", updatedUser });
  }),
};

module.exports = userCtrl;
