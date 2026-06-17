import { Pool } from "pg";

// Single shared pool. On Vercel/Neon the connection string is provided via the
// DATABASE_URL environment variable (Vercel Marketplace -> Neon Postgres).
const connectionString = process.env.DATABASE_URL;

declare global {
  // eslint-disable-next-line no-var
  var __nuronPool: Pool | undefined;
}

function createPool(): Pool {
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Connect a Neon Postgres database (Vercel Marketplace) and set DATABASE_URL."
    );
  }
  return new Pool({
    connectionString,
    // Neon (and most hosted Postgres) use publicly-trusted certs, so keep
    // certificate verification ON. Local Postgres typically has no TLS.
    ssl: connectionString.includes("localhost")
      ? false
      : { rejectUnauthorized: true },
    max: 5,
  });
}

export function getPool(): Pool {
  if (!global.__nuronPool) {
    global.__nuronPool = createPool();
  }
  return global.__nuronPool;
}

let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getPool()
      .query(
        `CREATE TABLE IF NOT EXISTS registrations (
          id              SERIAL PRIMARY KEY,
          full_name       TEXT        NOT NULL,
          phone           TEXT        NOT NULL,
          social_username TEXT        NOT NULL,
          has_bought      TEXT,
          has_sold        TEXT        NOT NULL,
          sold_category   TEXT,
          organization    TEXT,
          expectation     TEXT,
          created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
        )`
      )
      .then(() => undefined)
      .catch((err: unknown) => {
        schemaReady = null;
        throw err;
      });
  }
  return schemaReady as Promise<void>;
}
