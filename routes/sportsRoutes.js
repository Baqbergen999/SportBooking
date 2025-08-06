import express from "express";
import { getSportsData } from "../controllers/sportsController.js";

const router = express.Router();

router.get("/", getSportsData);

export default router;
