
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const DirectorySearchSchema = z.object({
  first_name: z.string().optional().default(''),
  last_name: z.string().optional().default(''),
  email: z.string().optional().default(''),
  type: z.string()
});