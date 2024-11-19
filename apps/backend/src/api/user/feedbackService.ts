import { StatusCodes } from "http-status-codes";

import type { Feedback } from "@/common/schemas/feedbackSchema";
import { FeedbackRepository } from "@/database/feedbackRepository";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { logger } from "@/server";

export class FeedbackService {
  private feedbackRepository: FeedbackRepository;

  constructor(repository: FeedbackRepository) {
    this.feedbackRepository = repository;
  }

  // Retrieves all feedback from the database
  async getAll(): Promise<ServiceResponse<Feedback[] | null>> {
    try {
      const feedbacks = await this.feedbackRepository.getAllFeedback();
      if (!feedbacks || feedbacks.length === 0) {
        return ServiceResponse.failure("No Feedback found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Feedback[]>("Feedback found", feedbacks);
    } catch (ex) {
      const errorMessage = `Error finding all feedback: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while retrieving feedback.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async storeFeedback(user_id: string, rating: number, content: string): Promise<ServiceResponse<null>> {
    try {
      await this.feedbackRepository.createFeedback(user_id, rating, content);
      logger.info("Feedback successfully stored.");
      return ServiceResponse.success("Feedback successfully stored", null);
    } catch (ex) {
      const errorMessage = `Error storing feedback: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while storing feedback.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
