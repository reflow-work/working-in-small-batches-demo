import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { time } from 'drizzle-orm/mysql-core';

export const todosTable = pgTable('todos', {
  id: serial('id').primaryKey(),
  content: varchar('content', { length: 256 }).notNull(),
  completed: boolean('completed').notNull(),
});

export const slackCredentialsTable = pgTable('slack_credentials', {
  id: serial('id').primaryKey(),
  token: varchar('token', { length: 256 }).notNull(),
});

export const googleChatCredentialsTable = pgTable('google_chat_credentials', {
  id: serial('id').primaryKey(),
  accessToken: varchar('access_token', { length: 256 }).notNull(),
  refreshToken: varchar('refresh_token', { length: 256 }).notNull(),
  expiryDate: timestamp('expiry_date').notNull(),
});

export const integrationsTable = pgTable('integrations', {
  id: serial('id').primaryKey(),
  provider: varchar('provider', { length: 256 }).notNull(),
  credentials: jsonb('credentials').notNull(),
});

export type TodoRecord = InferSelectModel<typeof todosTable>;
export type SlackCredentialRecord = InferSelectModel<
  typeof slackCredentialsTable
>;
export type GoogleChatCredentialRecord = InferSelectModel<
  typeof googleChatCredentialsTable
>;
export type IntegrationRecord = InferSelectModel<typeof integrationsTable>;
