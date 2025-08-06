import pool from "../config/db.js";

export const getSportsData = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sports");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Қате: " + error.message });
  }
};
