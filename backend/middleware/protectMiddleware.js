import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import USER from "../models/userModel.js";

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await USER.findById(decoded.id);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorize no token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorize no token" });
  }
});
