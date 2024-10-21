import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly data: T;
  readonly statusCode: number;

  private constructor(success: boolean, message: string, data: T, statusCode: number) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }

  static success<T>(message: string, data: T, statusCode: number = StatusCodes.OK) {
    return new ServiceResponse(true, message, data, statusCode);
  }

  static failure<T>(message: string, data: T, statusCode: number = StatusCodes.BAD_REQUEST) {
    return new ServiceResponse(false, message, data, statusCode);
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema.optional(),
    statusCode: z.number(),
  });
