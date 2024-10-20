import type { UserCourse } from "@/common/schemas/userCourseSchema";
import { FieldPacket, Pool } from 'mysql2/promise';


export class userCourseRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db; // Set the db connection to a class property
  }

  async getAllUserCourses(): Promise<UserCourse[]> {
    try {
      const [rows] = await this.db.query("SELECT * FROM user_courses");
      return rows as UserCourse[];
    } catch (error) {
      console.error("Database query failed:", error);
      throw error;
    }
  }

  async getUserCoursesById(id: number): Promise<UserCourse | null> {
    try {
      // Parameterized query to prevent SQL injection
      const [rows]: [any[], FieldPacket[]] = await this.db.query("SELECT * FROM user_courses WHERE user_id = ?", [id]);

      // Check if rows exist and are in an array-like format
      if (rows.length === 0) {
        return null;
      }
  
      // Return the first row as a object 
      // TODO: change logic to return more than one row to return ALL of a user's classes
      return rows[0] as UserCourse;
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch user's courses from the database");
    }
  }
  
}
