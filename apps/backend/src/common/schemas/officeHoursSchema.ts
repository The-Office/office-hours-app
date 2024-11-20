import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const OfficeHourSchema = z
  .object({
    course_id: z.number().int(),
    host: z.string().min(1),
    day: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]),
    start_time: z
      .string()
      .min(1, "Must have a start time")
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Must be in 24-hour format (HH:mm)"),
    end_time: z
      .string()
      .min(1, "Must have an end time")
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Must be in 24-hour format (HH:mm)"), // 00:00 to 12:00 am/pm
    mode: z.enum(["in-person", "remote", "hybrid"]),
    location: z
      .string()
      .regex(/^[A-Z]+[0-9]+$/)
      .optional(),
    link: z.union([z.string().url(), z.string().length(0)]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.mode === "hybrid") {
      if (!data.location || data.location.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["location"],
        });
      }
      if (!data.link || data.link.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["link"],
        });
      }
    } else if (data.mode === "in-person") {
      if (!data.location || data.location.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["location"],
        });
      }
    } else if (data.mode === "remote") {
      if (!data.link || data.link.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["link"],
        });
      }
    }
  });

export type OfficeHour = z.infer<typeof OfficeHourSchema>;

// // Input Validation for 'GET users/:id' endpoint
// export const GetCourseSchema = z.object({
//   params: z.object({ id: commonValidations.id }),
// });

export const PostOfficeHourSchema = z.object({
  body: OfficeHourSchema,
});

export const DeleteOfficeHoursScehma = z.object({
  body: OfficeHourSchema,
})
