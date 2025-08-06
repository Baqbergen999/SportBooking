import express from "express";
import { getSavedSports } from "../controllers/getSavedController.js";
const router = express.Router();

router.get("/:id/saved", getSavedSports);

export default router;
