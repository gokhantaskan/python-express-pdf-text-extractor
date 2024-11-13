import multer from "multer";
import { Request } from "express";
import { createError } from "../utils";
import { MAX_FILE_SIZE } from "./constants";

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype !== "application/pdf") {
    cb(createError("Invalid file type. Only PDF files are allowed.", 400));
    return;
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});
