import { StatusCodes } from "http-status-codes";

import type { UserCourse } from "@/common/schemas/userCourseSchema";
import { UserCourseRepository } from "@/database/userCourseRepository";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { logger } from "@/server";

export class UserCourseService {
  private userCourseRepository: UserCourseRepository;

  constructor(repository: UserCourseRepository) {
    this.userCourseRepository = repository;
  }

  // Retrieves all courses from the database
  async findAll(): Promise<ServiceResponse<UserCourse[] | null>> {
    try {
      const userCourses = await this.userCourseRepository.getAllUserCourses();
      if (!userCourses || userCourses.length === 0) {
        return ServiceResponse.failure("No Courses found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<UserCourse[]>("Courses found", userCourses);
    } catch (ex) {
      const errorMessage = `Error finding all courses: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving courses.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserCoursesById(id: number): Promise<ServiceResponse<UserCourse | null>> {
    try {
      const userCourses = await this.userCourseRepository.getUserCoursesById(id);
      if (!userCourses) {
        return ServiceResponse.failure("No Courses found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<UserCourse>("Courses found", userCourses);
    } catch (ex) {
      const errorMessage = `Error finding all courses: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving courses.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
