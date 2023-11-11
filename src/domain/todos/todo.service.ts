import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { TodoRecord, todosTable } from '../../db/schema';
import { Todo } from './todo';

export async function listTodos(): Promise<Todo[]> {
  const result = await db.select().from(todosTable);

  return result.map(toTodo);
}

async function getTodo(id: number): Promise<Todo> {
  const [result] = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, id));

  return toTodo(result);
}

export async function toggleTodo(id: number): Promise<Todo> {
  const todo = await getTodo(id);

  const updatedTodo = {
    ...todo,
    completed: !todo.completed,
  };

  await db
    .update(todosTable)
    .set({ completed: updatedTodo.completed })
    .where(eq(todosTable.id, id));

  return updatedTodo;
}

export async function deleteTodo(id: number): Promise<void> {
  await db.delete(todosTable).where(eq(todosTable.id, id));
}

function toTodo({ id, content, completed }: TodoRecord) {
  return {
    id,
    content,
    completed,
  };
}
