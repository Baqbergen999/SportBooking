import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/profile", authenticateToken, getProfile);
router.put("/profile", authenticateToken, updateProfile);

export default router;
