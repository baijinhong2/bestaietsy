// One-shot script to apply supabase/schema.sql to the shared Supabase project.
// Reads DATABASE_URL from .env.local (or uses hardcoded fallback from drawspark).
// Run: node scripts/apply-supabase-schema.mjs

import { readFileSync } from "node:fs";
import { Client } from "pg";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

// Read .env.local manually (no dotenv dep needed)
function loadEnv() {
  const envPath = resolve(projectRoot, ".env.local");
  try {
    const text = readFileSync(envPath, "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (m) process.env[m[1]] = m[2];
    }
  } catch (e) {
    console.error(`Cannot read ${envPath}: ${e.message}`);
  }
}

loadEnv();

// Allow DATABASE_URL override or use the one we know from drawspark
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:6yDRqyDctqtML59v@db.ewgqvjzwhjmdxpqquqva.supabase.co:5432/postgres";

const schemaPath = resolve(projectRoot, "supabase/schema.sql");
const schemaSql = readFileSync(schemaPath, "utf8");

console.log(`→ Connecting to Supabase...`);
const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
await client.connect();
console.log(`✓ Connected`);
console.log(`→ Applying schema (${schemaSql.length} bytes, ${schemaSql.split("\n").length} lines)...`);

try {
  await client.query(schemaSql);
  console.log(`✓ Schema applied successfully`);
} catch (e) {
  console.error(`✗ Failed: ${e.message}`);
  process.exit(1);
} finally {
  await client.end();
}

// Verify tables created
console.log(`→ Verifying tables...`);
const verify = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
await verify.connect();
const { rows: tables } = await verify.query(`
  select tablename from pg_tables
  where schemaname = 'public' and tablename like 'bestaietsy_%'
  order by tablename
`);
const { rows: views } = await verify.query(`
  select viewname from pg_views
  where schemaname = 'public' and viewname like 'bestaietsy_%'
  order by viewname
`);
console.log(`✓ Tables: ${tables.map((t) => t.tablename).join(", ") || "(none)"}`);
console.log(`✓ Views:  ${views.map((v) => v.viewname).join(", ") || "(none)"}`);
await verify.end();