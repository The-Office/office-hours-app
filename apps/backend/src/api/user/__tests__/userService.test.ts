import { StatusCodes } from "http-status-codes";
import type { Mock } from "vitest";

import type { User } from "@/common/schemas/userSchema";
import { UserRepository } from "@/database/userRepository";
import { UserService } from "@/api/user/userService";
import { db } from "@/database/init";

vi.mock("@/api/user/userRepository");


describe("userService", () => {
  let userServiceInstance: UserService;
  let userRepositoryInstance: UserRepository;

  const mockUsers: User[] = [
    {
      id: 1,
      canvas_user_id: BigInt(12345), // Use BigInt for BIGINT fields
      email: "alice@example.com",
      first_name: "Alice",
      last_name: "Smith", // Added last name
      canvas_login_id: "alice123", // Added canvas login ID
      access_token: "some-access-token",
      refresh_token: "some-refresh-token",
      token_expiration: new Date(), // Example expiration date
      role: "student", // Example role
      is_active: true, // Example active status
      ical_link: "https://example.com/ical/alice", // Optional field
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      canvas_user_id: BigInt(67890), // Use BigInt for BIGINT fields
      email: "bob@example.com",
      first_name: "Bob",
      last_name: "Jones", // Added last name
      canvas_login_id: "bob123", // Added canvas login ID
      access_token: "another-access-token",
      refresh_token: undefined, // Optional field can be undefined
      token_expiration: new Date(), // Example expiration date
      role: "instructor", // Example role
      is_active: true, // Example active status
      ical_link: undefined, // Optional field can be undefined
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  

  beforeEach(() => {
    userRepositoryInstance = new UserRepository(db);
    userServiceInstance = new UserService(userRepositoryInstance);
  });

  describe("findAll", () => {
    it("return all users", async () => {
      // Arrange
      (userRepositoryInstance.getAllUsers as Mock).mockReturnValue(mockUsers);

      // Act
      const result = await userServiceInstance.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).equals("Users found");
      expect(result.responseObject).toEqual(mockUsers);
    });

    it("returns a not found error for no users found", async () => {
      // Arrange
      (userRepositoryInstance.getAllUsers as Mock).mockReturnValue(null);

      // Act
      const result = await userServiceInstance.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("No Users found");
      expect(result.responseObject).toBeNull();
    });

    it("handles errors for getAllUsers", async () => {
      // Arrange
      (userRepositoryInstance.getAllUsers as Mock).mockRejectedValue(new Error("Database error"));

      // Act
      const result = await userServiceInstance.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("An error occurred while retrieving users.");
      expect(result.responseObject).toBeNull();
    });
  });

  describe("getById", () => {
    it("returns a user for a valid ID", async () => {
      // Arrange
      const testId = 1;
      const mockUser = mockUsers.find((user) => user.id === testId);
      (userRepositoryInstance.getById as Mock).mockReturnValue(mockUser);

      // Act
      const result = await userServiceInstance.getById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).equals("User found");
      expect(result.responseObject).toEqual(mockUser);
    });

    it("handles errors for getById", async () => {
      // Arrange
      const testId = 1;
      (userRepositoryInstance.getById as Mock).mockRejectedValue(new Error("Database error"));

      // Act
      const result = await userServiceInstance.getById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("An error occurred while finding user.");
      expect(result.responseObject).toBeNull();
    });

    it("returns a not found error for non-existent ID", async () => {
      // Arrange
      const testId = 1;
      (userRepositoryInstance.getById as Mock).mockReturnValue(null);

      // Act
      const result = await userServiceInstance.getById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("User not found");
      expect(result.responseObject).toBeNull();
    });
  });
});
