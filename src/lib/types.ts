import { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { PinoLogger } from "hono-pino";

export type AppBindings = {
  Variables: {
    logger: PinoLogger;
  };
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
