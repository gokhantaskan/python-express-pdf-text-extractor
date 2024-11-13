import express from "express";

import { upload } from "../config/multer";
import { handlePdfParse } from "../controllers/pdfController";

const router = express.Router();

router.post("/parse-pdf", upload.single("pdf"), handlePdfParse);

export default router;
