import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { TodoRecord, todosTable } from '../../db/schema';
import { Todo } from './todo';
import * as SlackService from '../notification/slack.service';
import * as SlackBlock from '../notification/slack-block';

export async function listTodos(): Promise<Todo[]> {
  const result = await db.select().from(todosTable).orderBy(todosTable.id);

  return result.map(toTodo);
}

async function getTodo(id: number): Promise<Todo> {
  const [result] = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, id));

  return toTodo(result);
}

export async function createTodo({
  content,
}: {
  content: string;
}): Promise<Todo> {
  const [result] = await db
    .insert(todosTable)
    .values({ content, completed: false })
    .returning();

  const todo = toTodo(result);

  SlackService.getAccessToken().then(({ token: token }) => {
    SlackService.postMessage(
      [SlackBlock.text_section(`Created todo: ${todo.content}`)],
      token
    );
  });

  return todo;
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
