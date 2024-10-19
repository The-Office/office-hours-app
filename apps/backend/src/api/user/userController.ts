import type { Request, RequestHandler, Response } from "express";

import { UserService } from "@/api/user/userService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
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
}