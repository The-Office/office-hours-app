import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export const officeHourStoreSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  class_section: z.number().int(),
  startTime: z.string(),
  endTime:   z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type officeHourStore = z.infer<typeof officeHourStoreSchema>;

export const PostOfficeHour = z.object({
  params: z.object({
    id: commonValidations.id,  // `id` from the route parameters
  }),
  body: z.object({
    class_section: z.string().min(1, "Class section cannot be empty"),  // `class_section` field from the JSON body
    startTime: z.string().min(1, "Must have a start time").regex(/^([0-9]|[1][0-2]):([0-5]\d)[ap]m$/, "Must be of valid time format"), // `startTime` field from the JSON body. Regex for a time from 00:00 to 12:00 am/pm
    endTime: z.string().min(1, "Must have an end time").regex(/^([0-9]|[1][0-2]):([0-5]\d)[ap]m$/, "Must be of valid time format"), // `endTime` field from the JSON body. Regex for a time from 00:00 to 12:00 am/pm
  }),
});