import { Request, Response } from "express";

import { CustomError, PdfParserResponse } from "../types";

export const errorHandler = (err: CustomError, req: Request, res: Response) => {
  console.error("Error:", err);

  const status = err.status || 500;
  const response: PdfParserResponse = {
    success: false,
    error: err.message || "Internal server error",
  };

  res.status(status).json(response);
};
