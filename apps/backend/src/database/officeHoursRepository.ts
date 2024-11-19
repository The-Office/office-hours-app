import { OfficeHour, OfficeHourSchema } from "@/common/schemas/officeHoursSchema";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { z } from "zod";


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
  async storeOfficeHour(data: z.infer<typeof OfficeHourSchema>): Promise<ServiceResponse<OfficeHour | null>> {
    try {
      const validated = OfficeHourSchema.parse(data);
      const query = `
        INSERT INTO office_hours (
          course_id, 
          host, 
          mode, 
          link, 
          location, 
          start_time, 
          end_time, 
          day
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      // Execute the insert and get the result
      const [result] = await this.db.execute<ResultSetHeader>(query, [
        validated.course_id,
        validated.host,
        validated.mode,
        validated.link,
        validated.location,
        validated.start_time,
        validated.end_time,
        validated.day
      ]);

      // Get the ID of the newly inserted record
      const insertId = result.insertId;

      // Fetch the newly inserted record using the exact ID
      const [rows] = await this.db.execute<RowDataPacket[]>(
        "SELECT * FROM office_hours WHERE id = ?",
        [insertId]
      );

      if (!rows || rows.length === 0) {
        return ServiceResponse.failure(
          "Office hour was created but could not be retrieved",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return ServiceResponse.success(
        "Office hours created successfully",
        rows[0] as OfficeHour
      );

    } catch (error) {
      if (error instanceof z.ZodError) {
        return ServiceResponse.failure(
          "Invalid office hours data provided",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      return ServiceResponse.failure(
        "An unexpected error occurred while creating office hours",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
