import type { Course } from "@/common/schemas/courseSchema";
import { FieldPacket, Pool } from 'mysql2/promise';


export class CourseRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db; // Set the db connection to a class property
  }

  async getAllCourses(): Promise<Course[]> {
    try {
      const [rows] = await this.db.query("SELECT * FROM courses");
      return rows as Course[];
    } catch (error) {
      console.error("Database query failed:", error);
      throw error;
    }
  }

  async getByCourseId(id: number): Promise<Course | null> {
    try {
      // Parameterized query to prevent SQL injection
      const [rows]: [any[], FieldPacket[]] = await this.db.query("SELECT * FROM courses WHERE course_id = ?", [id]);

      // Check if rows exist and are in an array-like format
      if (rows.length === 0) {
        return null;
      }
  
      // Return the first row as a Course object
      return rows[0] as Course;
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch course from the database");
    }
  }
  
}
