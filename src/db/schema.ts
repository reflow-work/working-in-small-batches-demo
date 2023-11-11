import { pgTable, serial, varchar, boolean } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

export const todosTable = pgTable('todos', {
  id: serial('id').primaryKey(),
  content: varchar('content', { length: 256 }).notNull(),
  completed: boolean('completed').notNull(),
});

export const slackCredentialsTable = pgTable('slack_credentials', {
  id: serial('id').primaryKey(),
  token: varchar('token', { length: 256 }).notNull(),
});

export type TodoRecord = InferSelectModel<typeof todosTable>;
export type SlackCredentialRecord = InferSelectModel<
  typeof slackCredentialsTable
>;
