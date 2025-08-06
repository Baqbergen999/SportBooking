import pool from "../config/db.js";

export const getSavedSports = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query(
      `
      SELECT s.*
      FROM user_saved_sports us
      JOIN sports s ON us.sport_id = s.id
      WHERE us.user_id = $1
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Сақталған спорттар алу қатесі:", error);
    res.status(500).json({ error: "Сақталған спорт алаңдарын алу қатесі" });
  }
};
