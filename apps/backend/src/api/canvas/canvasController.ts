import type { Request, RequestHandler, Response } from "express";

import { env } from "@/common/utils/envConfig";
import { CanvasService } from "./canvasService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";


const CANVAS_API_TOKEN = "";
export class CanvasController {
  private canvasService: CanvasService;

  constructor(canvasService: CanvasService) {
    this.canvasService = canvasService;
  }

  public getCourses: RequestHandler = async (_req:Request, res: Response) => {
    const serviceResponse = await this.canvasService.getCourses(CANVAS_API_TOKEN)
    return handleServiceResponse(serviceResponse, res);
  }

  public getFiles: RequestHandler = async (_req: Request, res: Response) => {
    let course_id = "521976";
    const serviceResponse = await this.canvasService.getCourseFiles(course_id, CANVAS_API_TOKEN);
    return handleServiceResponse(serviceResponse, res);
  }
}