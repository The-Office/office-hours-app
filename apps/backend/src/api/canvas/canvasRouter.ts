import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";
import axios from 'axios';

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

  try {
    
    const courses = await getCourseName("1016~e6kvGuP4EmzBkUrmmkke2WuuyRCvvQnaT6mWKTUeYyZtKBFMkhT3aNDAtyrf2Gvr");

    let courses_string = "";
    for(let i = 0; i < courses.list.length; i++) {
      courses_string += "  " + courses.list[i]["name"];
    }

    const serviceResponse = ServiceResponse.success(courses_string, null);
    return handleServiceResponse(serviceResponse, res);

  } catch(error) {

    const serviceResponse = ServiceResponse.failure("Failed to fetch course " + error, null);
    return handleServiceResponse(serviceResponse, res);

  }
});
// Using this video as tutorial template [https://www.youtube.com/watch?v=g-XOxZxrW6Q]

export type Courses = {
    list: string;
}

export async function getCourseName(accessToken: string): Promise<Courses> {
    const url = `https://ufl.instructure.com/api/v1/courses/`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }
    const res = await axios.get(url, {
        method: 'GET',  // or 'POST', 'PUT', etc. if needed
        headers: headers
    });
    return { list: res.data }

}

// canvas router, course endpoint
