import { createRouter } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCode from "stoker/http-status-codes";

const router = createRouter().openapi(
  createRoute({
    method: "get",
    tags: ["Index"],
    path: "/",
    responses: {
      [HttpStatusCode.OK]: jsonContent(
        z.object({
          message: z.string(),
        }),
        "Task API Index"
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: "Tasks API Index",
      },
      HttpStatusCode.OK
    );
  }
);

export default router;
