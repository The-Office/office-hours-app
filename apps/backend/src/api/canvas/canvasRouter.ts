import express, { type Request, type Response, type Router } from "express";
import { CanvasService } from "./canvasService";
import { CanvasController } from './canvasController'

import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

const canvasService = new CanvasService();
const canvasController = new CanvasController(canvasService);

export const canvasRouter: Router = express.Router();


canvasRouter.get("/ok", (_req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success("Canvas router in good health.", null);
  return handleServiceResponse(serviceResponse, res);

});

canvasRouter.get("/courses", canvasController.getCourses);
canvasRouter.get("/syllabi"); 
canvasRouter.get("/files", canvasController.getFiles)
