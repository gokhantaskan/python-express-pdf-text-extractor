import { Request } from "express";

export interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export interface CustomError extends Error {
  status?: number;
  details?: string;
}

export type PdfParserResponse = {
  success: boolean;
  data?: {
    text?: string;
    [key: string]: any;
  };
  error?: string;
} & (
  | { success: true; data: { text: string; [key: string]: any } }
  | { success: false; error: string }
);
