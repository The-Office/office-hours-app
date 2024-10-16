// do we have to import mysql? maybe the database should be connected here instead
// so we have an rds instance database-synchrohnize
// then I created a database inside the instance called all_info
// In the all_info database, there is a table called users
import type { User } from "@/api/user/userModel";
import { env } from "@/common/utils/envConfig";
import mysql from 'mysql2';

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD } = env;
const db = mysql.createConnection({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
})

db.connect((err) => {
  console.log(`MYSQL HOST: ${MYSQL_HOST}`)
  console.log(`MYSQL PORT: ${MYSQL_PORT}`)
  console.log(`MYSQL USER: ${MYSQL_USER}`)
  console.log(`MYSQL PASSWORD: ${MYSQL_PASSWORD}`)
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("Database connected.");
})

export class UserRepository {
  async findAllAsync(): Promise<User[]> {
    try {
      const result = await db.query("SELECT * FROM users");
      console.log("Query result:", result);
      const [rows] = result;
      return rows as User[];
    } catch (error) {
      console.error("Database query failed:", error);
      throw error;
    }
  }
}