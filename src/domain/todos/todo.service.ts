import { db } from "../../db";
import { TodoRecord, todosTable } from "../../db/schema";
import { Todo } from "./todo";

export async function listTodos(): Promise<Todo[]> {
  const result = await db.select().from(todosTable);

  return result.map(
    ({ id, content, completed }: TodoRecord) => ({ id, content, completed })
  )
}
