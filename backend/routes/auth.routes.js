import express from "express";
import { loginController, registerController, verifiedController } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { profileController } from "../controller/profile.controller.js";

  const router = express.Router()

router.post("/register",registerController)
router.get("/verify-email/:token",verifiedController)
router.post("/login",loginController)
router.get("/profile", authMiddleware, profileController);

export default router;