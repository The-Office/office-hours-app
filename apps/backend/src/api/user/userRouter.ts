import express, { type Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { validateRequest } from "@/common/utils/httpHandlers";
import { UserController } from "./userController";
import { db } from "@/database/init";
import { UserService } from "./userService";
import { UserRepository } from "@/database/userRepository";
import { CourseRepository } from "@/database/courseRepository";
import { OfficeHourRepository } from "@/database/officeHoursRepository";
import { UserCourseService } from "./userCourseService";
import { OfficeHourService } from "./officeHourService";
import { FeedbackService } from "./feedbackService";
import { FeedbackRepository } from "@/database/feedbackRepository";
import { PostFeedbackSchema } from "@/common/schemas/feedbackSchema";
import { PostOfficeHourSchema } from "@/common/schemas/officeHoursSchema";
import { StoreCourseSchema } from "@/common/schemas/courseSchema";
import { DeleteOfficeHoursScehma } from "@/common/schemas/officeHoursSchema";
import { SearchService } from "../search/searchService";

const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);

const courseRepository = new CourseRepository(db);
const courseService = new UserCourseService(courseRepository);

const officeHourRepository = new OfficeHourRepository(db)
const officeHourService = new OfficeHourService(officeHourRepository);

const feedbackRepository = new FeedbackRepository(db)
const feedbackService = new FeedbackService(feedbackRepository);

const searchService = new SearchService();


const userController = new UserController(userService, courseService, officeHourService, feedbackService, searchService);

export const userRouter: Router = express.Router(); 


userRouter.use(ClerkExpressRequireAuth());
userRouter.get("/", userController.getAllUsers);
userRouter.get("/me", userController.getUser);
userRouter.get("/me/courses", userController.getCoursesByUserId);
userRouter.get("/me/office-hours", userController.getOfficeHoursByUserId);
userRouter.post("/feedback", validateRequest(PostFeedbackSchema), userController.storeFeedback);
userRouter.post("/office-hours", validateRequest(PostOfficeHourSchema), userController.storeOfficeHour);
userRouter.delete("/office-hours", validateRequest(DeleteOfficeHoursScehma), userController.deleteOfficeHours);
userRouter.post("/courses", validateRequest(StoreCourseSchema), userController.storeCourse);
userRouter.post("/me", userController.storeUser);
userRouter.get("/courses/:course_id", userController.getCourse);

