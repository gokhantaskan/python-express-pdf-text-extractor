import cors from "cors";
import express from "express";

import { errorHandler } from "./middlewares/errorHandler";
import * as routes from "./routes";

const app = express();

// CORS middleware with specific configuration
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes.pdfRoutes);

// Error handling
app.use(errorHandler);

// Port
const PORT = 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
