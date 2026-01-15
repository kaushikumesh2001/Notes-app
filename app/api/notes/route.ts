

import pool from "@/src/lib/db";
import { NextResponse } from "next/server";

// GET - Fetch all notes
export async function GET() {
  const result = await pool.query(
    "SELECT * FROM notes ORDER BY id DESC"
  );
  return NextResponse.json(result.rows);
}

// POST - Add note
export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    const result = await pool.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Error saving note" },
      { status: 500 }
    );
  }
} // ✅ POST properly closed here

// PUT - Update note
export async function PUT(req: Request) {
  const { id, title, content } = await req.json();

  await pool.query(
    "UPDATE notes SET title = $1, content = $2 WHERE id = $3",
    [title, content, id]
  );

  return NextResponse.json({ message: "Note updated" });
}

// DELETE - Delete note
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await pool.query(
    "DELETE FROM notes WHERE id = $1",
    [id]
  );

  return NextResponse.json({ message: "Note deleted" });
}
