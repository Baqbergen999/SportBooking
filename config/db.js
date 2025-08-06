const { Pool } = require('pg');

const pool = new Pool({
  // user: 'postgres',
  // host: 'localhost',
  // database: 'Auth_system',
  // password: 'Baxa_2011',
  // port: 5432,
  connectionString: "postgresql://bakbergen:TWwNovbyBoNsiwh0Sd7i1o0wU2q2CjLs@dpg-d29o9nc9c44c73etmhmg-a.oregon-postgres.render.com/sport_booking_33co",
  ssl: {rejectUnauthorized: false}
});

module.exports = pool;