import env from "@/env";
import { pinoLogger as logger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

export function pinoLogger() {
  return logger({
    pino: pino(
      {
        level: env.LOG_LEVEL,
      },
      env.NODE_ENV !== "production" ? pretty() : undefined
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
