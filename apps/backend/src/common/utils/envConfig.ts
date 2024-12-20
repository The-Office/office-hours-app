import dotenv from "dotenv";
import { cleanEnv, host, num, port, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({choices: ["development", "production", "test"] }),
  HOST: host(),
  PORT: port(),
  CORS_ORIGIN: str(),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num(),
  COMMON_RATE_LIMIT_WINDOW_MS: num(),

  MYSQL_USER: str(), // No default here since it's required
  MYSQL_PASSWORD: str(), // Password is required
  MYSQL_HOST: host(), // Host validation for the database
  MYSQL_PORT: port(), // MySQL port as a number
  MYSQL_DATABASE: str(),

  OPENAI_API_KEY: str(),
});
