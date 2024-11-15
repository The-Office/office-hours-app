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

export const PostOfficeHourSchema = z.object({
  params: z.object({
    id: commonValidations.id,  // `id` from the route parameters
  }),
  body: z.object({
    host: z.string().min(1, "Must have a host"),
    mode: z.string().min(1, "Must have a modality"),
    start_time: z.string().min(1, "Must have a start time").regex(/^([0-9]|[1][0-2]):([0-5]\d) [ap]m$/, "Must be of valid time format"), // `startTime` field from the JSON body. Regex for a time from 00:00 to 12:00 am/pm
    end_time: z.string().min(1, "Must have an end time").regex(/^([0-9]|[1][0-2]):([0-5]\d) [ap]m$/, "Must be of valid time format"), // `endTime` field from the JSON body. Regex for a time from 00:00 to 12:00 am/pm
  }),
});
