import { Pool } from "pg";  

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "notes_db",
  password: "postgres",
  port: 5432,
});

export default pool;
