import type { Request, RequestHandler, Response } from "express";

import { UserService } from "@/api/user/userService";
import { UserCourseService } from "./userCourseService";
import { OfficeHourService } from "./officeHourService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

export class UserController {
  private userService: UserService;
  private userCourseService: UserCourseService;
  private officeHourService: OfficeHourService;

  constructor(userService: UserService, userCourseService: UserCourseService, officeHourService: OfficeHourService) {
    this.userService = userService;
    this.userCourseService = userCourseService;
    this.officeHourService = officeHourService;
  }

  
  public getAllUsers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await this.userService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getUserById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await this.userService.getById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  public getUserCoursesById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await this.userCourseService.getUserCoursesById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  // officeHourService.getCourseOfficeHoursById
  public getCourseOfficeHoursById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await this.officeHourService.getCourseOfficeHoursById(id);
    return handleServiceResponse(serviceResponse, res);
  }
  
}