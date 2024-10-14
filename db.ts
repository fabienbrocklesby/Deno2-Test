import * as SQLite from "https://deno.land/x/sqlite@v3.9.1/mod.ts";

const db = new SQLite.DB("./testdatabase.db");

db.query(`
  CREATE TABLE IF NOT EXISTS crud (
    id TEXT PRIMARY KEY,
    title TEXT,
    body TEXT,
    author TEXT,
    published DATETIME
  )
`);

export { db };