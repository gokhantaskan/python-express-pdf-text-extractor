import { ChildProcess } from "child_process";

import { PdfParserResponse } from "../types";
import { createError } from "../utils";

export const handlePythonProcess = (
  pythonProcess: ChildProcess,
  pdfBuffer: Buffer
): Promise<PdfParserResponse> => {
  return new Promise((resolve, reject) => {
    let stdoutData = "";
    let stderrData = "";

    if (!pythonProcess.stdout || !pythonProcess.stderr || !pythonProcess.stdin) {
      reject(createError("Python process streams unavailable", 500));
      return;
    }

    pythonProcess.stdout.on("data", (data: Buffer) => {
      stdoutData += data.toString();
    });

    pythonProcess.stderr.on("data", (data: Buffer) => {
      stderrData += data.toString();
      console.error("Python stderr:", stderrData);
    });

    pythonProcess.on("close", (code: number) => {
      console.log("Python stdout:", stdoutData);
      console.log("Process exit code:", code);

      if (code !== 0) {
        reject(createError(`PDF processing failed (Exit code: ${code})`, 500, stderrData));
        return;
      }

      if (!stdoutData.trim()) {
        reject(createError("No output from Python script", 500));
        return;
      }

      try {
        const parsedData = JSON.parse(stdoutData.trim());
        if (
          !parsedData ||
          (typeof parsedData === "object" && Object.keys(parsedData).length === 0)
        ) {
          reject(createError("Empty response from Python script", 500));
          return;
        }

        resolve({
          success: true,
          data: parsedData,
        });
      } catch (error) {
        console.error("JSON Parse Error:", error);
        console.error("Raw stdout:", stdoutData);
        reject(
          createError(
            "Failed to parse Python output",
            500,
            error instanceof Error ? error.message : "Unknown parsing error"
          )
        );
      }
    });

    pythonProcess.on("error", (error: Error) => {
      console.error("Python process error:", error);
      reject(createError("Failed to start PDF processor", 500, error.message));
    });

    // Send PDF data to Python script
    pythonProcess.stdin.write(pdfBuffer);
    pythonProcess.stdin.end();
  });
};
