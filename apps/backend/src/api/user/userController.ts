import type { Request, RequestHandler, Response } from "express";

import { UserService } from "@/api/user/userService";
import { CourseService } from "./courseService";
import { OfficeHourService } from "./officeHourService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { CourseRepository } from "@/database/courseRepository";
import { OfficeHourRepository } from "@/database/officeHoursRepository";
import { ServiceResponse } from "@/common/schemas/serviceResponse";

export class UserController {
  private userService: UserService;
  private courseService: CourseService;
  private officeHourService: OfficeHourService;

  constructor(userService: UserService, courseService: CourseService, officeHourService: OfficeHourService) {
    this.userService = userService;
    this.courseService = courseService;
    this.officeHourService = officeHourService;
  }


  // courseService
  // officeHoursService
  
  public getAllUsers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await this.userService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getUserById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await this.userService.getById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  // courseService.getByCourseId
  public getByCourseId: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await this.courseService.getByCourseId(id);
    return handleServiceResponse(serviceResponse, res);
  };

  // officeHourService.getCourseOfficeHoursById
  public getCourseOfficeHoursById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await this.officeHourService.getCourseOfficeHoursById(id);
    return handleServiceResponse(serviceResponse, res);
  }
  
}