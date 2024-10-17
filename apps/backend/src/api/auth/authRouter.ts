import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

authRegistry.registerPath({
  method: "get",
  path: "/auth",
  tags: ["Authorization"],
  responses: createApiResponse(z.null(), "Success"),
});

authRouter.get("/ok", (_req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success("This is the auth router.", null);
  return handleServiceResponse(serviceResponse, res);
});
