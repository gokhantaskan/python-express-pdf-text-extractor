import cors from "cors";
import express from "express";

import { corsOptions } from "./config/cors";
import env from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";
import * as routes from "./routes";

const app = express();

if (env.NODE_ENV === "production") {
  // Use restrictive CORS in production
  app.use(cors(corsOptions));
} else {
  // Allow all origins in development
  app.use(cors());
}

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes.pdfRoutes);

// Error handling
app.use(errorHandler);

const PORT = 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${env.NODE_ENV} environment.`);

  if (env.NODE_ENV === "production") {
    console.log(`CORS is activated. Origins: ${env.CORS_ORIGINS}`);
  } else {
    console.log("CORS is disabled.");
  }
});

export default app;
