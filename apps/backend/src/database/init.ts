import { env } from "@/common/utils/envConfig";
import mysql from "mysql2/promise";

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = env;

export const db = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection by running a simple query
(async () => {
  try {
    // Log the connection details for debugging
    // Get a connection from the pool and test it with a simple query
    const connection = await db.getConnection();
    await connection.query("SELECT 1"); // Simple query to check if the connection works
    console.log("Successfully connected to database.");
    connection.release(); // Release the connection back to the pool
  } catch (err: unknown) {
    // Check if err is an instance of Error
    if (err instanceof Error) {
      console.error("Error connecting to the database:", err.message);
    } else {
      // Handle cases where the error is not an instance of Error
      console.error("Unknown error:", err);
    }
  }
})();
