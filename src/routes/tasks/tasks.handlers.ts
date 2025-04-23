import db from "@/db";
import type {
  CreateListRoute,
  GetOneRoute,
  ListRoute,
  PatchRoute,
  RemoveRoute,
} from "./tasks.routes";
import { AppRouteHandler } from "@/lib/types";
import { tasks } from "@/db/schema";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { eq } from "drizzle-orm";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks);
};

export const createList: AppRouteHandler<CreateListRoute> = async (c) => {
  const task = c.req.valid("json");
  const [newTask] = await db.insert(tasks).values(task).returning();
  return c.json(newTask, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const params = c.req.valid("param");
  const task = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, params.id);
    },
  });
  if (!task) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }
  return c.json(task, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const params = c.req.valid("param");
  const body = c.req.valid("json");
  console.log(params, body);

  const [task] = await db
    .update(tasks)
    .set(body)
    .where(eq(tasks.id, params.id))
    .returning();
  console.log(task);
  if (!task) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }
  return c.json(task, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const params = c.req.valid("param");
  const task = await db.delete(tasks).where(eq(tasks.id, params.id));
  if (task.rowsAffected === 0) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }
  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
