// import express from "express"
// import cors from "cors"
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"
// import pg from "pg"
// import pool from "../config/db.js"

// const app = express()
// const PORT = 3000
// const JWT_SECRET = "super_secret_key"

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));


// app.use(express.json())

// async function initializeDatabase() {
//   try {
//     const client = await pool.connect()

//     const tableCheck = await client.query(`
//       SELECT EXISTS (
//         SELECT FROM information_schema.tables 
//         WHERE table_name = 'users'
//       );
//     `)

//     if (!tableCheck.rows[0].exists) {
//       await client.query(`
//         CREATE TABLE users (
//           id SERIAL PRIMARY KEY,
//           username VARCHAR(100) UNIQUE NOT NULL,
//           password VARCHAR(100) NOT NULL,
//           email VARCHAR(100),
//           phone VARCHAR(20),
//           avatar TEXT,
//           join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           bookmarked_areas INTEGER DEFAULT 0,
//           reviews_written INTEGER DEFAULT 0,
//           saved_items INTEGER DEFAULT 0
//         );
//       `)
//       console.log("✅ Users table created successfully")

//       const hashedPassword = await bcrypt.hash("test123", 10)
//       await client.query(
//         `INSERT INTO users (username, password, email, phone, bookmarked_areas, reviews_written, saved_items)
//          VALUES ('testuser', $1, 'test@example.com', '+7 (777) 123-45-67', 5, 12, 8)`,
//         [hashedPassword],
//       )
//       console.log("✅ Test user created (username: testuser, password: test123)")
//     } else {
//       console.log("✅ Users table already exists")
//     }

//     client.release()
//   } catch (err) {
//     console.error("❌ Database initialization error:", err)
//   }
// }

// initializeDatabase()

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"]
//   const token = authHeader && authHeader.split(" ")[1]

//   if (!token) return res.status(401).json({ message: "Authentication token required" })

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid or expired token" })
//     req.user = user
//     next()
//   })
// }

// app.post("/register", async (req, res) => {
//   const { username, password } = req.body

//   if (!username || !password) {
//     return res.status(400).json({ error: "Барлық жолдарды толтырыңыз" })
//   }

//   try {
//     const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username])

//     if (userExists.rows.length > 0) {
//       return res.status(400).json({ error: "Бұл қолданушы аты бос емес" })
//     }

//     const hashedPassword = await bcrypt.hash(password, 10)
//     const newUser = await pool.query(
//       "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, join_date",
//       [username, hashedPassword],
//     )

//     const user = newUser.rows[0]

//     const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "24h" })

//     res.status(201).json({
//       token,
//       user: {
//         id: user.id,
//         username: user.username,
//         join_date: user.join_date,
//       },
//     })
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).json({ error: "Сервер қатесі" })
//   }
// })

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body

//   try {
//     const userQuery = await pool.query("SELECT * FROM users WHERE username = $1", [username])

//     if (userQuery.rows.length === 0) {
//       return res.status(400).json({ error: "Қолданушы табылмады" })
//     }

//     const user = userQuery.rows[0]

//     const isMatch = await bcrypt.compare(password, user.password)

//     if (!isMatch) {
//       return res.status(400).json({ error: "Қолданушы аты немесе құпиясөз қате" })
//     }

//     const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "24h" })

//     res.json({
//       token,
//       user: {
//         id: user.id,
//         username: user.username,
//       },
//     })
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).json({ error: "Сервер қатесі" })
//   }
// })

// app.get("/profile", authenticateToken, async (req, res) => {
//   try {
//     const userId = req.user.id

//     const result = await pool.query(
//       "SELECT id, username, email, phone, join_date, avatar, bookmarked_areas, reviews_written, saved_items FROM users WHERE id = $1",
//       [userId],
//     )

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "Пайдаланушы табылмады" })
//     }

//     res.json(result.rows[0])
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "Сервер қатесі" })
//   }
// })

// app.put("/profile", authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.user
//     const { username, email, phone, avatar } = req.body

//     await pool.query("UPDATE users SET username = $1, email = $2, phone = $3, avatar = $4 WHERE id = $5", [
//       username,
//       email,
//       phone,
//       avatar,
//       id,
//     ])

//     res.json({ message: "Профиль жаңартылды" })
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).json({ error: "Сервер қатесі" })
//   }
// })

// app.get("/", (req, res) => {
//   res.json({ message: "Server is running!" })
// })

// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`)
//   console.log(`📊 Test user: username=testuser, password=test123`)
// })


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
app.use("/users", userSavedRoutes); // Тек бір рет

app.use(authRoutes);
app.use(profileRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use("/sportsData", sportsRoutes); // Мүмкін бұл да duplicate болуы мүмкін. Төмен қара


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
