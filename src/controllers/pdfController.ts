import { Response, NextFunction } from "express";
import { spawn } from "child_process";
import { MulterRequest } from "../types";
import { createError } from "../utils";
import { isPdfFile } from "../utils";
import { PYTHON_SCRIPT_PATH } from "../config/constants";
import { handlePythonProcess } from "../services/pythonService";

export async function handlePdfParse(req: MulterRequest, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      throw createError("No PDF file uploaded", 400);
    }

    if (!isPdfFile(req.file.buffer)) {
      throw createError("Invalid PDF file format", 400);
    }

    const pythonProcess = spawn("python3", [PYTHON_SCRIPT_PATH]);
    const result = await handlePythonProcess(pythonProcess, req.file.buffer);

    res.json(result);
  } catch (error) {
    next(error instanceof Error ? error : new Error("Unknown error"));
  }
}