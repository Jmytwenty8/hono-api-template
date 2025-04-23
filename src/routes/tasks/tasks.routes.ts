import { notFound } from "stoker/middlewares";
import {
  insertTaskScheme,
  patchTaskSchema,
  selectTasksScheme,
} from "@/db/schema";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  jsonContent,
  jsonContentOneOf,
  jsonContentRequired,
} from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";
import { notFoundSchema } from "@/lib/constants";

export const list = createRoute({
  path: "/tasks",
  method: "get",
  tags: ["Tasks"],
  summary: "List all tasks",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTasksScheme),
      "List of tasks"
    ),
  },
});

export const create = createRoute({
  path: "/tasks",
  method: "post",
  tags: ["Tasks"],
  summary: "Create a task",
  request: {
    body: jsonContentRequired(insertTaskScheme, "Task to create"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksScheme, "The created task"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTaskScheme),
      "Validation failed"
    ),
  },
});

export const getOne = createRoute({
  path: "/tasks/{id}",
  method: "get",
  tags: ["Tasks"],
  summary: "Get a task",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksScheme,
      "Get details of a specific task"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(selectTasksScheme),
      "Invalid ID Error!"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not found for the specified Id"
    ),
  },
});

export const patch = createRoute({
  path: "/tasks/{id}",
  method: "patch",
  tags: ["Tasks"],
  summary: "Patch a task",
  request: {
    params: IdParamsSchema,
    body: jsonContent(patchTaskSchema, "Task to update"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksScheme, "The updated task"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(patchTaskSchema), createErrorSchema(IdParamsSchema)],
      "Validation failed"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not found for the specified Id"
    ),
  },
});

export const remove = createRoute({
  path: "/tasks/{id}",
  method: "delete",
  tags: ["Tasks"],
  summary: "Delete a task",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Task deleted successfully",
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Validation failed"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not found for the specified Id"
    ),
  },
});

export type CreateListRoute = typeof create;
export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
