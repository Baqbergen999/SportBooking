import pool from "../config/db.js";

export const addReviewToSport = async (req, res) => {
  const { sportId, review } = req.body;

  if (!sportId || !review) {
    return res.status(400).json({ error: "sportId және review қажет" });
  }

  try {
    await pool.query(
      `
      UPDATE sports
      SET reviews = COALESCE(reviews, '[]'::jsonb) || $1::jsonb
      WHERE id = $2
    `,
      [JSON.stringify([review]), sportId]
    );

    res.status(200).json({ message: "Пікір сәтті қосылды" });
  } catch (err) {
    console.error('Қате:', error.message);

    res.status(500).json({ error: "Сервер қатесі" });
  }
};

export const getReviewsBySportId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT reviews FROM sports WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Спорт объект табылмады" });
    }

    res.status(200).json({ reviews: result.rows[0].reviews || [] });
  } catch (err) {
    console.error("Пікірлерді алу қатесі:", err.message);
    res.status(500).json({ error: "Сервер қатесі" });
  }
};

