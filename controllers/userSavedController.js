import pool from "../config/db.js";

export const saveSport = async (req, res) => {
  const { userId, sportId } = req.body;

  if (!userId || !sportId) {
    return res.status(400).json({ error: "userId және sportId қажет" });
  }

  try {
    const checkQuery = `SELECT * FROM user_saved_sports WHERE user_id = $1 AND sport_id = $2`;
    const checkResult = await pool.query(checkQuery, [userId, sportId]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: "Бұл спорт объектісі бұрын сақталған" });
    }

    const insertQuery = `
      INSERT INTO user_saved_sports (user_id, sport_id)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await pool.query(insertQuery, [userId, sportId]);

    res.status(201).json({ message: "Сақталды", saved: result.rows[0] });
  } catch (err) {
    console.error("Сақтау қатесі:", err);
    res.status(500).json({ error: "Сақтау кезінде қате болды" });
  }
};

export const getSavedSports = async (req, res) => {
  const userId = req.params.id;

  try {
    const query = `
      SELECT sports.* FROM sports
      JOIN user_saved_sports ON sports.id = user_saved_sports.sport_id
      WHERE user_saved_sports.user_id = $1
    `;
    const result = await pool.query(query, [userId]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Қате:", err);
    res.status(500).json({ error: "Сақталғандарды алу қатесі" });
  }
};


export const unsaveSport = async (req, res) => {
  const { userId, sportId } = req.body;

  try {
    await pool.query(
      'DELETE FROM user_saved_sports WHERE user_id = $1 AND sport_id = $2',
      [userId, sportId]
    );
    console.log(sportId);
    
    res.status(200).json({ message: 'Сәтті өшірілді' });

  } catch (error) {
    console.error('Unsave қатесі:', error);
    res.status(500).json({ error: 'Сервер ішінде қате шықты' });
  }
};

export const bookSport = async (req, res) => {
  const { userId, sportId } = req.body;

  if (!userId || !sportId) {
    return res.status(400).json({ error: "userId және sportId қажет" });
  }

  try {
    await pool.query(
      "INSERT INTO bookings (user_id, sport_id) VALUES ($1, $2)",
      [userId, sportId]
    );
    res.json({ message: "Брондау сәтті сақталды" });
  } catch (error) {
    console.error("Брондау қатесі:", error);
    res.status(500).json({ error: "Сервер қатесі" });
  }
};

export const getBookedItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT s.*
       FROM bookings b
       JOIN sports s ON b.sport_id = s.id
       WHERE b.user_id = $1`,
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Брондалған спорттарды алу қатесі:", error);
    res.status(500).json({ error: "Брондалған спорттарды алу қатесі" });
  }
};

export const unBookSport = async (req, res) => {
  const { userId, sportId } = req.body;

  try {
    await pool.query(
      'DELETE FROM bookings WHERE user_id = $1 AND sport_id = $2',
      [userId, sportId]
    );
    console.log(sportId);
    
    res.status(200).json({ message: 'Сәтті өшірілді' });

  } catch (error) {
    console.error('Unsave қатесі:', error);
    res.status(500).json({ error: 'Сервер ішінде қате шықты' });
  }
};