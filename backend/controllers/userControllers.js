import USER from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../../../PROSHOP/backend/utils/generateToken.js";

export const signUp = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const isEmaiExist = await USER.findOne({ email });

  if (isEmaiExist) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const user = await USER.create({ name, email, password });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
});

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await USER.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

export const userProfile = expressAsyncHandler(async (req, res) => {
  const user = await USER.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

export const userDetails = expressAsyncHandler(async (req, res) => {
  const user = await USER.findById(req.params.id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return res.status(404).json({ message: "User Not Found" });
  }
});
