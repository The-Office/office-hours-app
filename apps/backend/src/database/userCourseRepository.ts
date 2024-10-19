import type { Course } from "@/common/schemas/userCourseSchema";
import { FieldPacket, Pool } from 'mysql2/promise';


export class userCourseRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db; // Set the db connection to a class property
  }

  async getAllCourses(): Promise<Course[]> {
    try {
      const [rows] = await this.db.query("SELECT * FROM user_courses");
      return rows as Course[];
    } catch (error) {
      console.error("Database query failed:", error);
      throw error;
    }
  }

  async getById(id: number): Promise<Course | null> {
    try {
      // Parameterized query to prevent SQL injection
      const [rows]: [any[], FieldPacket[]] = await this.db.query("SELECT * FROM user_courses WHERE id = ?", [id]);

      // Check if rows exist and are in an array-like format
      if (rows.length === 0) {
        return null;
      }
  
      // Return the first row as a User object
      return rows[0] as Course;
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch user from the database");
    }
  }
  
}
