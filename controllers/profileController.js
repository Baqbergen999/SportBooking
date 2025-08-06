import pool from "../config/db.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT id, username, email, phone, join_date, avatar FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Пайдаланушы табылмады" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Сервер қатесі" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { username, email, phone, avatar } = req.body;

    await pool.query(
      "UPDATE users SET username = $1, email = $2, phone = $3, avatar = $4 WHERE id = $5",
      [username, email, phone, avatar, id]
    );

    res.json({ message: "Профиль жаңартылды" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Сервер қатесі" });
  }
};
