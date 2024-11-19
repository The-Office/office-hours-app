import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const IcalSchema = z.object({
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

export type IcalFile = z.infer<typeof IcalSchema>;