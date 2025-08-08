import express from "express";
import {
  saveSport,
  getSavedSports,
  unsaveSport,
  bookSport,
  getBookedItems,
  unBookSport
} from "../controllers/userSavedController.js";

const router = express.Router();

router.post("/save", saveSport);
router.get("/:id/saved", getSavedSports);
router.post("/unsave", unsaveSport);
router.post("/book-sport", bookSport);
router.get("/:userId/booked", getBookedItems);
router.post("/unbook", unBookSport);

export default router;
