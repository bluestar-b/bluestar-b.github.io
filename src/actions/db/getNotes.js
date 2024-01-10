import { sql } from "./pgsql"

export async function getNotes() {
  return await sql`SELECT * FROM Notes`
}

export async function getNoteById(noteId) {
  return await sql`SELECT * FROM Notes WHERE id = ${noteId}`
}
