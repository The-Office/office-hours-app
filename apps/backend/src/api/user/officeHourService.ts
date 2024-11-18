import { StatusCodes } from "http-status-codes";

import type { OfficeHour } from "@/common/schemas/officeHoursSchema";
import { OfficeHourRepository } from "@/database/officeHoursRepository";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { logger } from "@/server";
import ical, { ICalCalendar, ICalCalendarMethod } from 'ical-generator';

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

  async getOfficeHoursByUserId(id: number): Promise<ServiceResponse<OfficeHour[] | null>> {
    try {
      const officehours = await this.officeHourRepository.getOfficeHoursByUserId(id);
      if (!officehours) {
        return ServiceResponse.failure("No office hours found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<OfficeHour[]>("Office hours found", officehours);
    } catch (ex) {
      const errorMessage = `Error finding office hour by id: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving office hours.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getIcalFileByUserId(id: number): Promise<ServiceResponse<ICalCalendar | null>> {
    try {
      const officehours = await this.officeHourRepository.getOfficeHoursByUserId(id);
      if(!officehours) {
        return ServiceResponse.failure("No office hours found", null, StatusCodes.NOT_FOUND)
      }
      const icalFile = ical ({ name: `Office Hours for User ${id}` });

      for(const oh of officehours) {
        icalFile.createEvent({
          start: new Date(oh.start_time),
          end: new Date(oh.end_time),
          description: `Course Id: ${oh.course_id}. \nHost: ${oh.host}. \nMode: ${oh.mode}. \nLink: ${oh.link}`,
          location: oh.location
        })

      }
      return ServiceResponse.success<ICalCalendar>("Office hours found", icalFile);
    } catch (ex) {
      const errorMessage = `Error in generating office hour ical file by id: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving and storing office hours to ical file.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async storeOfficeHours(host: string, mode: string, link: string, location: string, start_time: string, end_time: string): Promise<ServiceResponse<null>> {
    try {
      await this.officeHourRepository.storeOfficeHours(host, mode, link, location, start_time, end_time);
      logger.info("Office hours successfully stored.");
      return ServiceResponse.success("Office hours successfully stored", null);
    } catch (ex) {
      const errorMessage = `Error storing office hours: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while storing office hours.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
