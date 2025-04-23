import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { pinoLogger } from "@/middlewares/pino-logger";
import { AppBindings } from "./types";
import { defaultHook } from "stoker/openapi";

export function createRouter() {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
  return app;
}

export default function createApp() {
  const app = createRouter();
  app.notFound(notFound);
  app.onError(onError);
  app.use(pinoLogger());
  app.use(serveEmojiFavicon("👋"));
  return app;
}
