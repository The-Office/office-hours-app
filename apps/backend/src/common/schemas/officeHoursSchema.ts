import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export const OfficeHourSchema = z.object({
  course_id: z.number().int(),
  host: z.string(),
  mode: z.enum(['remote', 'in-person', 'hybrid']),
  location: z.string(),
  link: z.string().url(),
  start_time: z.string(),
  end_time: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type OfficeHour = z.infer<typeof OfficeHourSchema>;

// // Input Validation for 'GET users/:id' endpoint
// export const GetCourseSchema = z.object({
//   params: z.object({ id: commonValidations.id }),
// });
