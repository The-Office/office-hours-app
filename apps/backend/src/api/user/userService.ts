import { StatusCodes } from "http-status-codes";

import type { User } from "@/common/schemas/userSchema";
import { UserRepository } from "@/database/userRepository";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { logger } from "@/server";

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository) {
    this.userRepository = repository;
  }

  // Retrieves all users from the database
  async getAll(): Promise<ServiceResponse<User[] | null>> {
    try {
      const users = await this.userRepository.getAllUsers();
      if (!users || users.length === 0) {
        return ServiceResponse.failure("No Users found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<User[]>("Users found", users);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string): Promise<ServiceResponse<User | null>> {
    try {
      const user = await this.userRepository.getById(id);
      if (!user) {
        return ServiceResponse.failure("No User found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<User>("User found", user);
    } catch (ex) {
      const errorMessage = `Error finding all user: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving user.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async saveUserIdToDatabase(id: string): Promise<void> {
    await this.userRepository.saveUserIdToDatabase(id);
  }
}
