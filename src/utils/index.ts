import { CustomError } from "../types";

export function isPdfFile(buffer: Buffer): boolean {
  return buffer.toString("hex").startsWith("255044462d");
}

export function createError(message: string, status: number = 500, details?: string): CustomError {
  const error: CustomError = new Error(message);
  error.status = status;

  if (details) {
    error.details = details;
    error.message = `${message}: ${details}`;
  }

  return error;
}
