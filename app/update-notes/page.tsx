"use client";

import { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string; 
};

export default function UpdateNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const startEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const updateNote = async () => {
    if (!editingNote) return;

    await fetch("/api/notes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingNote.id,
        title,
        content,
      }),
    });

    setEditingNote(null);
    setTitle("");
    setContent("");
    fetchNotes();
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-2/3">

        <h2 className="text-2xl font-bold text-center mb-6">
          Update Notes
        </h2>

        {notes.map((note) => (
          <div
            key={note.id}
            className="border-2 rounded-xl p-4 mb-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{note.title}</h3>
              <p>{note.content}</p>
            </div>

            <button
              onClick={() => startEdit(note)}
              className="border-2 px-4 py-1 rounded-xl font-bold
              border-blue-600 hover:bg-blue-800 hover:text-white"
            >
              Edit
            </button>
          </div>
        ))}

        {editingNote && (
          <div className="border-2 rounded-xl p-4 mt-6">
            <h3 className="font-bold mb-2">Edit Note</h3>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 p-2 w-full mb-2"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border-2 p-2 w-full mb-2"
            />

            <button
              onClick={updateNote}
              className="border-2 px-6 py-2 rounded-xl font-bold
              border-green-600 hover:bg-green-800 hover:text-white"
            >
              Save Changes
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
