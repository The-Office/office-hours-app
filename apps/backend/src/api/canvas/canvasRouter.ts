import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";
import { writeCourseNames, writeCoursesSyllabi } from "./canvasController";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

export const canvasRegistry = new OpenAPIRegistry();
export const canvasRouter: Router = express.Router();

canvasRegistry.registerPath({
  method: "get",
  path: "/canvas",
  tags: ["Canvas Router"],
  responses: createApiResponse(z.null(), "Success"),
});

canvasRouter.get("/ok", (_req: Request, res: Response) => {

  const serviceResponse = ServiceResponse.success("Router in good health.", null);
  return handleServiceResponse(serviceResponse, res);

});

canvasRouter.get("/courses", async (_req: Request, res: Response) => {
  let courses_string = await writeCourseNames();
  const serviceResponse = ServiceResponse.success(courses_string, null);
  return handleServiceResponse(serviceResponse, res);

});

canvasRouter.get("/syllabus", async (_req: Request, res: Response) => {
  // let courses_syllabi = await writeCoursesSyllabi();
  const serviceResponse = ServiceResponse.success("Not implemented yet", null);
  return handleServiceResponse(serviceResponse, res); 
});

canvasRouter.get("/files", async (_req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success("Not implemented yet", null);
  return handleServiceResponse(serviceResponse, res);
})
