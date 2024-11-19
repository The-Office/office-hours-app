import type { Course } from "@/common/schemas/courseSchema";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { UserCourse } from "@/common/schemas/userCourseSchema";
import { StatusCodes } from "http-status-codes";
import { FieldPacket, Pool, QueryResult, ResultSetHeader, RowDataPacket } from "mysql2/promise";

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

  async getAllUserCourses(): Promise<UserCourse[]> {
    try {
      const [rows] = await this.db.query("SELECT * FROM user_courses");
      return rows as UserCourse[];
    } catch (error) {
      console.error("Database query failed:", error);
      throw error;
    }
  }

  async getCoursesByUserId(id: string): Promise<Course[]> {
    try {
      // Parameterized query to prevent SQL injection
      const [rows]: [any[], FieldPacket[]] = await this.db.query(
        "SELECT * FROM courses JOIN user_courses ON courses.course_id = user_courses.course_id WHERE user_id = ?",
        [id]
      );

      // Check if rows exist and are in an array-like format
      if (rows.length === 0) {
        return [];
      }

      return rows as Course[];
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch user's courses from the database");
    }
  }

  async storeCourse(course_id: number, course_code: string, title: string): Promise<ServiceResponse<Course | null>> {
    course_code = course_code.replace(/\s+/g, '');
    try {
      // Insert the course
      const [result] = await this.db.execute<ResultSetHeader>(
        "INSERT INTO courses (course_id, course_code, title) VALUES (?, ?, ?)", 
        [course_id, course_code, title]
      );
      
      // Fetch the newly inserted course
      const [rows] = await this.db.execute<RowDataPacket[]>(
        "SELECT * FROM courses WHERE course_id = ?",
        [course_id]
      );
      
      if (!rows || rows.length === 0) {
        return ServiceResponse.failure(
          "Course was created but could not be retrieved",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return ServiceResponse.success(
        "Course stored successfully", 
        rows[0] as Course
      );
    } catch (error) {
      console.error("Database query failed:", error);
      return ServiceResponse.failure(
        "Failed to store course", 
        null, 
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
