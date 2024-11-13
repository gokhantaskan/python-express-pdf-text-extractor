import { Request, Response, NextFunction } from "express";
import { CustomError, PdfParserResponse } from "../types";

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);

  const status = err.status || 500;
  const response: PdfParserResponse = {
    success: false,
    error: err.message || "Internal server error",
  };

  res.status(status).json(response);
};
