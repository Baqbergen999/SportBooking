import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import pool from "./config/db.js";
import bcrypt from "bcrypt";
import sportsRoutes from "./routes/sportsRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import sportsDataRoutes from "./routes/addSportRoutes.js"
import userSavedRoutes from "./routes/userSavedRoutes.js";
const PORT = 3000
const app = express();

app.use(cors({ origin: ["http://localhost:5173",  "https://sportbookingzhattapal.netlify.app"], credentials: true }));
app.use(express.json());

app.use("/reviews", reviewRoutes);
app.use("/sportsData", sportsDataRoutes);
app.use("/users", userSavedRoutes);

app.use(authRoutes);
app.use(profileRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use("/sportsData", sportsRoutes);


async function initializeDatabase() {
  try {
    const client = await pool.connect();

    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(100) NOT NULL,
          email VARCHAR(100),
          phone VARCHAR(20),
          avatar TEXT,
          join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          bookmarked_areas INTEGER DEFAULT 0,
          reviews_written INTEGER DEFAULT 0,
          saved_items INTEGER DEFAULT 0
        );
      `);

      const hashedPassword = await bcrypt.hash("test123", 10);
      await client.query(
        `INSERT INTO users (username, password, email, phone, bookmarked_areas, reviews_written, saved_items)
         VALUES ('testuser', $1, 'test@example.com', '+7 (777) 123-45-67', 5, 12, 8)`,
        [hashedPassword]
      );

      console.log("✅ Users table created and test user added");
    } else {
      console.log("✅ Users table already exists");
    }
 
    client.release();
  } catch (err) {
    console.error("❌ DB Init Error:", err);
  }
}

initializeDatabase();

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
