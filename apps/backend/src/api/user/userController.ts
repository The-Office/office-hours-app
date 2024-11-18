import type { Request, RequestHandler, Response } from "express";

import { UserService } from "@/api/user/userService";
import { UserCourseService } from "./userCourseService";
import { OfficeHourService } from "./officeHourService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { FeedbackService } from "./feedbackService";
// import { ServiceResponse } from "@/common/schemas/serviceResponse";

export class UserController {
  private userService: UserService;
  private userCourseService: UserCourseService;
  private officeHourService: OfficeHourService;
  private feedbackService: FeedbackService;
  // private officeHourStoreService: OfficeHourStoreService;

  constructor(
    userService: UserService,
    userCourseService: UserCourseService,
    officeHourService: OfficeHourService,
    feedbackService: FeedbackService
  ) {
    this.userService = userService;
    this.userCourseService = userCourseService;
    this.officeHourService = officeHourService;
    this.feedbackService = feedbackService;
  }

  public getAllUsers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await this.userService.getAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getUserById: RequestHandler = async (req: Request, res: Response) => {
    const user_id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await this.userService.getById(user_id);
    return handleServiceResponse(serviceResponse, res);
  };

  public getCoursesByUserId: RequestHandler = async (req: Request, res: Response) => {
    const user_id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await this.userCourseService.getCoursesByUserId(user_id);
    return handleServiceResponse(serviceResponse, res);
  };

  public getOfficeHoursByUserId: RequestHandler = async (req: Request, res: Response) => {
    const user_id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await this.officeHourService.getOfficeHoursByUserId(user_id);
    return handleServiceResponse(serviceResponse, res);
  };

  public getIcalFileByUserId: RequestHandler = async (req: Request, res: Response) => {
    const user_id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await this.officeHourService.getIcalFileByUserId(user_id);
    return handleServiceResponse(serviceResponse, res);
  }

  public storeFeedback: RequestHandler = async (req: Request, res: Response) => {
    const user_id = Number.parseInt(req.params.id as string, 10);
    const content = req.body.content;
    const rating = req.body.rating;
    const serviceResponse = await this.feedbackService.storeFeedback(user_id, rating, content);
    return handleServiceResponse(serviceResponse, res);
  };

  public storeOfficeHours: RequestHandler = async (req: Request, res: Response) => { 
    const user_id = Number.parseInt(req.params.id as string, 10);
    const host = req.body.host;
    const mode = req.body.mode;
    const link = req.body.link;
    const location = req.body.location;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const day = req.body.day;
    const serviceResponse = await this.officeHourService.storeOfficeHours(host, mode, link, location, start_time, end_time);
    return handleServiceResponse(serviceResponse,res)
  };

}
