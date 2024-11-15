import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/schemas/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

import { clerkMiddleware } from '@clerk/express';

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

authRegistry.registerPath({
  method: "get",
  path: "/auth",
  tags: ["Authorization"],
  responses: createApiResponse(z.null(), "Success"),
});

authRouter.get("/ok", (req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success("This is the auth router.", null);
  return handleServiceResponse(serviceResponse, res);
});

import { clerkClient, requireAuth } from "@clerk/express";

authRouter.get('/protected', requireAuth({ signInUrl: '/sign-in' }), (req, res) => {
  res.send('This is a protected route')
})

authRouter.get("/sign-in", (req, res) => {
  // Assuming you have a template engine installed and are using a Clerk JavaScript SDK on this page
  res.render("sign-in");
});

authRouter.use(clerkMiddleware())
