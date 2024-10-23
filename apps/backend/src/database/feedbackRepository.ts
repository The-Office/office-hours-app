import type { Feedback } from "@/common/schemas/feedbackSchema";
import { FieldPacket, Pool } from "mysql2/promise";

export class FeedbackRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db; // Set the db connection to a class property
  }
  async getAllFeedback(): Promise<Feedback[]> {
    try {
      // Execute the query to select all feedback
      const [rows]: [any[], FieldPacket[]] = await this.db.query("SELECT * FROM feedback");

      // Return the rows as an array of Feedback objects
      return rows as Feedback[];
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch feedback from the database");
    }
  }

  async createFeedback(user_id: number, rating: number, content: string): Promise<void> {
    try {
      await this.db.execute(`INSERT INTO feedback (user_id, rating, content) VALUES (?, ?, ?)`, [user_id, rating, content]);
    } catch (error) {
      console.error("Failed to insert feedback:", error);
      throw new Error("An error occurred while inserting feedback into the database");
    }
  }
}
