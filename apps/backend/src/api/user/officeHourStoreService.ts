import { StatusCodes } from "http-status-codes";

import type { OfficeHourStore } from "@/common/schemas/officeHoursStoringSchema";
import { OfficeHourStoreRepository } from "@/database/officeHourStoreRepository";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { logger } from "@/server";

export class OfficeHourStoreService {
  private officeHourStoreRepository: OfficeHourStoreRepository;

  constructor(repository: OfficeHourStoreRepository) {
    this.officeHourStoreRepository = repository;
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

  async storeFeedback(user_id: number, rating: number, content: string): Promise<ServiceResponse<null>> {
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
