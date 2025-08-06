import express from "express";
import { addSportFacility } from "../controllers/addSportController.js";

const router = express.Router();

// POST: жаңа спорт нысанын қосу
router.post("/add", addSportFacility);

export default router;
