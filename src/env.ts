import { z } from "zod";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config());

const envSchema = z
  .object({
    PORT: z.coerce.number().default(9999),
    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace"])
      .default("info"),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  })
  .refine((input) => {
    if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
      return false;
    }
    return true;
  });

export type env = z.infer<typeof envSchema>;

let env: env;

try {
  env = envSchema.parse(process.env);
} catch (e) {
  const error = e as z.ZodError;
  console.error("❌ Invalid environment variables:");
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export default env;
