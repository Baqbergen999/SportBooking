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

router.post("/save", saveSport); // POST /users/save
router.get("/:id/saved", getSavedSports); // GET /users/saved/:id
router.post("/unsave", unsaveSport); // POST /users/unsave
router.post("/book-sport", bookSport); // POST /users/book
router.get("/:userId/booked", getBookedItems); // GET /users/bookings/:userId
router.post("/unbook", unBookSport);

export default router;
