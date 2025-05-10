import appRootPath from "app-root-path";
import { config } from "dotenv";
import { z } from "zod";

const USE_SAFE_DOTENV = false;
if (USE_SAFE_DOTENV) {
  // A safer alternative as it depends on named empty property .env.example for it to parse .env correctly
  require("dotenv-safe").config();
} else {
  config({
    path: appRootPath.resolve(".env"),
    // path.resolve(import.meta.dirname, "../../../.env"),
  });
}

const envSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Error parsing .env file");
  console.error(result.error.message);
  process.exit(1);
}

export const env = result.data;
