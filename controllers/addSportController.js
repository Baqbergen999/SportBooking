import pool from "../config/db.js";

// Жаңа спорт нысанын қосу
export const addSportFacility = async (req, res) => {
  const {
    name,
    city,
    address,
    type,
    capacity,
    price,
    image,
    amenities,
    workinghours,
    ownerId, // егер иесін сақтағың келсе
  } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO sports (
        city, name, address, type, capacity, price,
        image, amenities, workinghours, rating, reviews
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 5.0, '[]'::jsonb)
      RETURNING *;
    `,
      [
        city,
        name,
        address,
        type,
        capacity,
        price,
        image,
        amenities,
        workinghours,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Қосу қатесі:", error);
    res.status(500).json({ error: "Нысанды қосу кезінде қате шықты" });
  }
};
