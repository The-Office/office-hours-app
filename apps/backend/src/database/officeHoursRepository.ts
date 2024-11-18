import type { OfficeHour } from "@/common/schemas/officeHoursSchema";
import { FieldPacket, Pool } from 'mysql2/promise';


export class OfficeHourRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db; // Set the db connection to a class property
  }

  async getAllOfficeHours(): Promise<OfficeHour[]> {
    try {
      const [rows] = await this.db.query(
        "SELECT office_hours.*, courses.course_code FROM office_hours LEFT JOIN courses ON office_hours.course_id = courses.course_id"
      );
      return rows as OfficeHour[];
    } catch (error) {
      console.error("Database query failed:", error);
      throw error;
    }
  }
  
  async getOfficeHoursByUserId(id: string): Promise<OfficeHour[]> {
    try {
      // Parameterized query to prevent SQL injection
      const [rows]: [any[], FieldPacket[]] = await this.db.query("SELECT office_hours.*, courses.course_code FROM office_hours JOIN user_courses ON office_hours.course_id = user_courses.course_id LEFT JOIN courses ON office_hours.course_id = courses.course_id WHERE user_courses.user_id = ?", [id]);
      return rows as OfficeHour[];
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch user from the database");
    }
  }

  async storeOfficeHours(host: string, mode: string, link: string, location: string, start_time: string, end_time: string, day: string): Promise<void> {
    try {
      await this.db.execute(`INSERT INTO office_hours (host, mode, link, location, start_time, end_time, day) VALUES (?, ?, ?, ?, ?, ?, ?)`, [host, mode, link, location, start_time, end_time, day]);
    } catch (error) {
      console.error("Failed to insert new office hours:", error);
      throw new Error("An error occurred while inserting new office hours into the database");
    }
  }
  
}
