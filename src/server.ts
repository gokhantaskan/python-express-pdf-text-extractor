import express from "express";
import cors from "cors";
import pdfRoutes from "./routes/pdfRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// CORS middleware
app.use(cors());

// Routes
app.use("/api", pdfRoutes);

// Error handling
app.use(errorHandler);

// Port
const PORT = 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
