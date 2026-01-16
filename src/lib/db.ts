// import { Pool } from "pg";  

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "notes_db",
//   password: "postgres",
//   port: 5432,
// });

// export default pool;


import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export default pool;