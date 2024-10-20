import { StatusCodes } from "http-status-codes";

import type { Course } from "@/common/schemas/courseSchema";
import { CourseRepository } from "@/database/courseRepository";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { logger } from "@/server";

export class CourseService {
  private courseRepository: CourseRepository;

  constructor(repository: CourseRepository) {
    this.courseRepository = repository;
  }

  // Retrieves all courses from the database
  async findAll(): Promise<ServiceResponse<Course[] | null>> {
    try {
      const courses = await this.courseRepository.getAllCourses();
      if (!courses || courses.length === 0) {
        return ServiceResponse.failure("No Courses found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Course[]>("Courses found", courses);
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

  async getByCourseId(id: number): Promise<ServiceResponse<Course | null>> {
    try {
      const course = await this.courseRepository.getByCourseId(id);
      if (!course) {
        return ServiceResponse.failure("No Course found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Course>("User found", course);
    } catch (ex) {
      const errorMessage = `Error finding all course: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving course.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
