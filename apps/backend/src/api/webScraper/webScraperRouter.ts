import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

export const webScraperRegistry = new OpenAPIRegistry();
export const webScraperRouter: Router = express.Router();

webScraperRegistry.registerPath({
  method: "get",
  path: "/web-scraper",
  tags: ["Web Scraper"],
  responses: createApiResponse(z.null(), "Success"),
});

webScraperRouter.get("/", (_req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success("Service is healthy", null);
  return handleServiceResponse(serviceResponse, res);
});
