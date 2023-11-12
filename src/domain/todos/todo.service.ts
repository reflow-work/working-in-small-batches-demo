import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { TodoRecord, todosTable } from '../../db/schema';
import { Todo } from './todo';
import { listIntegrations } from '../integrations/integration.service';
import { link, text } from '../notifications/block';
import { notify } from '../notifications/notification.service';

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

  const blocks = [
    text(`Created todo: ${todo.content}`),
    link(`Open in browser`, 'https://https://www.recatch.cc/'),
  ];

  listIntegrations().then((integrations) => {
    integrations.map((integration) => {
      notify(integration.provider, blocks, integration.credentials);
    });
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
