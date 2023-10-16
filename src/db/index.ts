import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const queryClient = postgres(process.env.DATABASE_URL!);

export const db: PostgresJsDatabase = drizzle(queryClient, { logger: true });

await migrate(db, { migrationsFolder: './migrations' });
