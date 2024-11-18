import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

import { clerkMiddleware } from '@clerk/express';
import { clerkClient, requireAuth } from "@clerk/express";
import { ClerkExpressRequireAuth, withAuth } from "@clerk/clerk-sdk-node";
import { db } from "@/database/init";
import { UserService } from "../user/userService";
import { UserRepository } from "@/database/userRepository";
import { CourseRepository } from "@/database/courseRepository";
import { OfficeHourRepository } from "@/database/officeHoursRepository";
import { UserCourseService } from "../user/userCourseService";
import { OfficeHourService } from "../user/officeHourService";
import { FeedbackService } from "../user/feedbackService";
import { FeedbackRepository } from "@/database/feedbackRepository";
import { UserController } from "../user/userController";

const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);


export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

// Apply Clerk middleware to authenticate requests
authRouter.use(ClerkExpressRequireAuth());

authRegistry.registerPath({
  method: "get",
  path: "/auth",
  tags: ["Authorization"],
  responses: createApiResponse(z.null(), "Success"),
});

// Public route - doesn't require authentication
authRouter.get("/ok", (req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success("This is the auth router.", null);
  return handleServiceResponse(serviceResponse, res);
});

// Protected route - requires authentication
authRouter.get('/protected', requireAuth({ signInUrl: '/sign-in' }), (req: Request, res: Response) => {
  // Access the user info from req.auth
  const user_id = req.auth.user_id;
  res.send(`This is a protected route. User ID: ${user_id}`);
});

// Sign-in route - public
authRouter.get("/sign-in", (req: Request, res: Response) => {
  res.render("sign-in");
});

// Login route - public, but attempts to save the user ID to DB
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    // Access user info from req.auth
    const user_id = req.auth.user_id;
    await userService.saveUserIdToDatabase(user_id);  // Call service directly
    res.status(200).send({ message: 'User logged in and ID saved' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'An error occurred while saving user ID' });
  }
});


// Profile route - protected, only available for authenticated users
authRouter.get("/profile", (req: Request, res: Response) => {
  // Access user info from req.auth
  const user_id = req.auth.user_id;
  res.send(`Hello user ${user_id}`);
});

