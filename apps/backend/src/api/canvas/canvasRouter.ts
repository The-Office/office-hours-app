import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";
import { CanvasService } from "./canvasService";
import { CanvasController } from './canvasController'

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

const canvasService = new CanvasService();
const canvasController = new CanvasController(canvasService);

export const canvasRegistry = new OpenAPIRegistry();
export const canvasRouter: Router = express.Router();

canvasRegistry.registerPath({
  method: "get",
  path: "/canvas",
  tags: ["Canvas Router"],
  responses: createApiResponse(z.null(), "Success"),
});

canvasRegistry.registerPath({
  method: "get",
  path: "/canvas/ok",
  tags: ["Canvas Router"],
  responses: createApiResponse(z.null(), "Success"),
});

canvasRegistry.registerPath({
  method: "get",
  path: "/canvas/courses",
  tags: ["Canvas Router"],
  responses: createApiResponse(z.null(), "Success"),
});

canvasRegistry.registerPath({
  method: "get",
  path: "/canvas/syllabi",
  tags: ["Canvas Router"],
  responses: createApiResponse(z.null(), "Success"),
});

canvasRegistry.registerPath({
  method: "get",
  path: "/canvas/files",
  tags: ["Canvas Router"],
  responses: createApiResponse(z.null(), "Success"),
});

canvasRouter.get("/ok", (_req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success("Canvas router in good health.", null);
  return handleServiceResponse(serviceResponse, res);

});

canvasRouter.get("/courses", canvasController.getCourses);
canvasRouter.get("/syllabi"); 
canvasRouter.get("/files", canvasController.getFiles)