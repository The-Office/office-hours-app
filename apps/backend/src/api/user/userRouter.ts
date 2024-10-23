import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetUserSchema, UserSchema } from "@/common/schemas/userSchema";
import { validateRequest } from "@/common/utils/httpHandlers";
import { UserController } from "./userController";
import { db } from "@/database/init";
import { UserService } from "./userService";
import { UserRepository } from "@/database/userRepository";
import { CourseSchema } from "@/common/schemas/courseSchema";
import { OfficeHourSchema } from "@/common/schemas/officeHoursSchema";
import { CourseRepository } from "@/database/courseRepository";
import { OfficeHourRepository } from "@/database/officeHoursRepository";
import { UserCourseService } from "./userCourseService";
import { OfficeHourService } from "./officeHourService";

const userRepository = new UserRepository(db);
const courseRepository = new CourseRepository(db);
const officeHourRepository = new OfficeHourRepository(db)
const userService = new UserService(userRepository);
const courseService = new UserCourseService(courseRepository);
const officeHourService = new OfficeHourService(officeHourRepository);
const userController = new UserController(userService, courseService, officeHourService);

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserSchema);

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(UserSchema), "Success"),
});

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(UserSchema, "Success"),
});

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}/courses",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(z.array(CourseSchema), "Success"),
});

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}/office-hours",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(z.array(OfficeHourSchema), "Success"),
});


userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", validateRequest(GetUserSchema), userController.getUserById);
userRouter.get("/:id/courses", validateRequest(GetUserSchema), userController.getCoursesByUserId);
userRouter.get("/:id/office-hours", validateRequest(GetUserSchema), userController.getOfficeHoursByUserId);

