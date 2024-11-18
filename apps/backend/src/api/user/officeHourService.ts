import { StatusCodes } from "http-status-codes";

import type { OfficeHour } from "@/common/schemas/officeHoursSchema";
import { OfficeHourRepository } from "@/database/officeHoursRepository";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { logger } from "@/server";

export class OfficeHourService {
  private officeHourRepository: OfficeHourRepository;

  constructor(repository: OfficeHourRepository) {
    this.officeHourRepository = repository;
  }

  // Retrieves all courses from the database
  async getAll(): Promise<ServiceResponse<OfficeHour[] | null>> {
    try {
      const officehours = await this.officeHourRepository.getAllOfficeHours();
      if (!officehours || officehours.length === 0) {
        return ServiceResponse.failure("No office hours found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<OfficeHour[]>("Office hours found", officehours);
    } catch (ex) {
      const errorMessage = `Error finding all office hours: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving office hours.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOfficeHoursByUserId(id: string): Promise<ServiceResponse<OfficeHour[] | null>> {
    try {
      // const officehours = await this.officeHourRepository.getOfficeHoursByUserId(id);
      const officehours = await this.officeHourRepository.getAllOfficeHours();
      if (!officehours) {
        return ServiceResponse.failure("No office hours found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<OfficeHour[]>("Office hours found", officehours);
    } catch (ex) {
      const errorMessage = `Error finding all office hours: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving office hours.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async storeOfficeHours(host: string, mode: string, link: string, location: string, start_time: string, end_time: string, day: string): Promise<ServiceResponse<null>> {
    try {
      await this.officeHourRepository.storeOfficeHours(host, mode, link, location, start_time, end_time, day);
      logger.info("Office hours successfully stored.");
      return ServiceResponse.success("Office hours successfully stored", null);
    } catch (ex) {
      const errorMessage = `Error storing office hours: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while storing office hours.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
