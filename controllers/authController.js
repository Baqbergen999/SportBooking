import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../utils/jwtConfig.js";

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Барлық жолдарды толтырыңыз" });

  try {
    const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (userExists.rows.length > 0)
      return res.status(400).json({ error: "Бұл қолданушы аты бос емес" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, join_date",
      [username, hashedPassword]
    );

    const user = newUser.rows[0];
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "24h" });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        join_date: user.join_date,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Сервер қатесі" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userQuery = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (userQuery.rows.length === 0)
      return res.status(400).json({ error: "Қолданушы табылмады" });

    const user = userQuery.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Қолданушы аты немесе құпиясөз қате" });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "24h" });

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Сервер қатесі" });
  }
};

// export const getSportsData = async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM sports");
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ message: "Қате: " + error.message });
//   }
// };