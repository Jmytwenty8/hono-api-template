import { AppOpenAPI } from "./types";
import packageJSON from "../../package.json";
import { Scalar } from "@scalar/hono-api-reference";

export default function configureOpenApi(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: "Tasks API",
      version: packageJSON.version,
    },
  });

  app.get(
    "/scalar",
    Scalar({
      layout: "classic",
      defaultHttpClient: {
        clientKey: "fetch",
        targetKey: "js",
      },
      url: "/doc",
    })
  );
}
