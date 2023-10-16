import { pgTable, serial, varchar, boolean } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

export const todosTable = pgTable('todos', {
  id: serial('id').primaryKey(),
  content: varchar('content', { length: 256 }).notNull(),
  completed: boolean('completed').notNull(),
});

export type TodoRecord = InferSelectModel<typeof todosTable>;
