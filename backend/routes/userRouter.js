import express from "express";
const router = express.Router();
import {
  signUp,
  login,
  userProfile,
  userDetails,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/protectMiddleware.js";

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/profile").get(protect, userProfile);
router.route("/:id").get(protect, userDetails);

export default router;
