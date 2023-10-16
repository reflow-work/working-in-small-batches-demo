import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "./schema"

const queryClient = postgres(process.env.DATABASE_URL!);

export const db: PostgresJsDatabase = drizzle(queryClient, { schema: schema, logger: true });
