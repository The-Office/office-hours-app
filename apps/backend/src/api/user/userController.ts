import type { Request, RequestHandler, Response } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";

import { UserService } from "@/api/user/userService";
import { UserCourseService } from "./userCourseService";
import { OfficeHourService } from "./officeHourService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { FeedbackService } from "./feedbackService";
import { SearchService } from "../search/searchService";
import { ServiceResponse } from "@/common/schemas/serviceResponse";

export class UserController {
  private userService: UserService;
  private userCourseService: UserCourseService;
  private officeHourService: OfficeHourService;
  private feedbackService: FeedbackService;
  private searchService: SearchService;

  constructor(
    userService: UserService,
    userCourseService: UserCourseService,
    officeHourService: OfficeHourService,
    feedbackService: FeedbackService,
    searchService: SearchService
  ) {
    this.userService = userService;
    this.userCourseService = userCourseService;
    this.officeHourService = officeHourService;
    this.feedbackService = feedbackService;
    this.searchService = searchService;
  }

  public getAllUsers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await this.userService.getAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getUser: RequestHandler = async (req: Request, res: Response) => {
    const user_id = req.auth.userId;
    const serviceResponse = await this.userService.getById(user_id);
    return handleServiceResponse(serviceResponse, res);
  };

  public storeUser: RequestHandler = async (req: Request, res: Response) => {
    const user_id = req.auth.userId;
    const clerkUser = await clerkClient.users.getUser(user_id);
    if (!clerkUser) {
      return res.status(404).json({ error: "No Clerk User found" });
    }

    const email = clerkUser.primaryEmailAddress?.emailAddress || "";
    if (!email) {
      return res.status(400).json({ error: "No email found for user" });
    }

    const results = await this.searchService.searchDirectory({
      first_name: "",
      last_name: "",
      email,
      type: "staff",
    });

    const userType = results.data.some((result) => result.email === email) ? "professor" : "student";

    const serviceResponse = await this.userService.storeUser(user_id, userType);
    return handleServiceResponse(serviceResponse, res);
  };

  public getCoursesByUserId: RequestHandler = async (req: Request, res: Response) => {
    const user_id = req.auth.userId;
    const serviceResponse = await this.userCourseService.getCoursesByUserId(user_id);
    return handleServiceResponse(serviceResponse, res);
  };

  public deleteUserCourse: RequestHandler = async (req: Request, res: Response) => {
    const user_id = req.auth.userId;
    const course_id = Number(req.params.course_id);
    const serviceResponse = await this.userCourseService.deleteUserCourse(user_id, course_id);
    return handleServiceResponse(serviceResponse, res);
  };

  public storeUserCourse: RequestHandler = async (req: Request, res: Response) => {
    const user_id = req.auth.userId;
    const course_id = Number(req.params.course_id);
    const serviceResponse = await this.userCourseService.storeUserCourse(user_id, course_id);
    return handleServiceResponse(serviceResponse, res);
  };

  public getOfficeHoursByUserId: RequestHandler = async (req: Request, res: Response) => {
    const user_id = req.auth.userId;
    const serviceResponse = await this.officeHourService.getOfficeHoursByUserId(user_id);
    return handleServiceResponse(serviceResponse, res);
  };

  public getIcalFileByIds: RequestHandler = async (req: Request, res: Response) => {
    if (typeof req.query.ids !== undefined) {
      let office_hour_ids = req.query.ids;
      const serviceResponse = await this.officeHourService.getIcalFileByIds(office_hour_ids);
      return handleServiceResponse(serviceResponse, res);
    } else {
      return handleServiceResponse(ServiceResponse.failure("Missing query parameters", null), res);
    }
  };

  public getIcalFileByUserId: RequestHandler = async (req: Request, res: Response) => {
    const user_id = req.auth.userId;
    const serviceResponse = await this.officeHourService.getIcalFileByUserId(user_id);
    return handleServiceResponse(serviceResponse, res);
  };

  public storeFeedback: RequestHandler = async (req: Request, res: Response) => {
    const user_id = req.auth.userId;
    const { content, rating } = req.body;
    const serviceResponse = await this.feedbackService.storeFeedback(user_id, rating, content);
    return handleServiceResponse(serviceResponse, res);
  };

  public storeOfficeHour: RequestHandler = async (req: Request, res: Response) => {
    const user_id = req.auth.userId;
    const user = await this.userService.getById(user_id);
    const role = user?.data?.role || "";
    const authorizedRoles = ["professor", "admin"];
    if (!authorizedRoles.includes(role)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const serviceResponse = await this.officeHourService.storeOfficeHour(req.body);
    return handleServiceResponse(serviceResponse, res);
  };

  public deleteOfficeHours: RequestHandler = async (req: Request, res: Response) => {
    const user_id = req.auth.userId;
    let ids = req.query.ids;
    const serviceResponse = await this.officeHourService.deleteOfficeHours(ids);
    return handleServiceResponse(serviceResponse, res);
  };

  public storeCourse: RequestHandler = async (req: Request, res: Response) => {
    const user_id = req.auth.userId;
    const { course_id, course_code, title } = req.body;
    const serviceResponse = await this.userCourseService.storeCourse(course_id, course_code, title);
    return handleServiceResponse(serviceResponse, res);
  };

  public getCourse: RequestHandler = async (req: Request, res: Response) => {
    const user_id = req.auth.userId;
    const course_id = Number(req.params.course_id);

    if (isNaN(course_id)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const serviceResponse = await this.userCourseService.getByCourseId(course_id);
    return handleServiceResponse(serviceResponse, res);
  };

  public getAllCourses: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await this.userCourseService.getAll();
    return handleServiceResponse(serviceResponse, res);
  };
}
