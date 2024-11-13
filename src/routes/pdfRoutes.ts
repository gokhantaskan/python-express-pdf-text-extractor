import express from "express";
import { handlePdfParse } from "../controllers/pdfController";
import { upload } from "../config/multer";

const router = express.Router();

router.post("/parse-pdf", upload.single("pdf"), handlePdfParse);

export default router;
