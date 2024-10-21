import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export const CourseSchema = z.object({
  course_id: z.number().int(),
  course_code: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type Course = z.infer<typeof CourseSchema>;

// Input Validation for 'GET users/:id' endpoint
export const GetCourseSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
