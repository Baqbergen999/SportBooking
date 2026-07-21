// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "sport_booking_w5jf",
//   port: 5432,
//   password: "Baxa_2011",
//   connectionString:
//     "postgresql://sport_booking:PCNZSJ7G4tBJqmqJvLU2Bg1RIsX9JyxK@dpg-d9f6a1t7vvec73fnomh0-a.oregon-postgres.render.com/sport_booking_w5jf",
//   ssl: { rejectUnauthorized: false },
// });

// module.exports = pool;

//////////////////////////////////////////////////////////////////////////////////////////

// const { Pool } = require("pg");
// require("dotenv").config(); // .env файлын оқу үшін

// // Eгер process.env.DATABASE_URL болмаса, локальный URL-ді ала салады
// const connectionString =
//   process.env.DATABASE_URL ||
//   "postgresql://sport_booking:PCNZSJ7G4tBJqmqJvLU2Bg1RIsX9JyxK@dpg-d9f6a1t7vvec73fnomh0-a.oregon-postgres.render.com/sport_booking_w5jf";

// const pool = new Pool({
//   connectionString: connectionString,
//   ssl: {
//     rejectUnauthorized: false, // Render Postgres үшін міндетті
//   },
// });

// module.exports = pool;

////////////////////////////////////////////////////////////////////////////////////////////
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://sport_booking:PCNZSJ7G4tBJqmqJvLU2Bg1RIsX9JyxK@dpg-d9f6a1t7vvec73fnomh0-a.oregon-postgres.render.com/sport_booking_w5jf";

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool; // <-- Рекса, дәл осылай export default жасаймыз!