import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

/**
 * Reuse the pg Pool across hot-reloads in development to avoid
 * exhausting the PostgreSQL connection limit.
 *
 * In production `globalThis._pgPool` is undefined on each cold start,
 * so a fresh pool is always created.
 */
declare global {
  var _pgPool: Pool | undefined;
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const pool =
  globalThis._pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis._pgPool = pool;
}

export const db = drizzle(pool, { schema });
export type DB = typeof db;
