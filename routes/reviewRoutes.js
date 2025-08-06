import express from "express";
import { addReviewToSport, getReviewsBySportId } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/add", addReviewToSport);
router.get("/:id", getReviewsBySportId);


export default router;
