import { config } from "dotenv";
config({ path: ".env.local", override: true });
config({ path: ".env" });

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

/**
 * Reuse the pg Pool across hot-reloads in development to avoid
 * exhausting the PostgreSQL connection limit, but re-create if DATABASE_URL changes.
 */
declare global {
  var _pgPool: Pool | undefined;
  var _pgPoolUrl: string | undefined;
}

const connectionString =
  process.env.DATABASE_URL || "postgresql://premkumark:@localhost:5432/patient_connect";

let pool: Pool;

if (
  globalThis._pgPool &&
  globalThis._pgPoolUrl === connectionString
) {
  pool = globalThis._pgPool;
} else {
  if (globalThis._pgPool) {
    try {
      globalThis._pgPool.end();
    } catch {
      // Ignore cleanup error
    }
  }
  pool = new Pool({
    connectionString,
    max: 10,
  });
  if (process.env.NODE_ENV !== "production") {
    globalThis._pgPool = pool;
    globalThis._pgPoolUrl = connectionString;
  }
}

export const db = drizzle(pool, { schema });
export type DB = typeof db;

