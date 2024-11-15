import type { CorsOptions } from "cors";

import env from "./env";

export const corsOptions: CorsOptions = {
  origin: env.CORS_ORIGINS.split(","),
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
