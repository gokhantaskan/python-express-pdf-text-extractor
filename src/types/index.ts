import { Request } from "express";

export interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export interface PdfParserResponse {
  success: boolean;
  data?: {
    text?: string;
    [key: string]: any;
  };
  error?: string;
}

export interface CustomError extends Error {
  status?: number;
  details?: string;
}
