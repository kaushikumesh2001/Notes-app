"use client";

import { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function DeleteNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id: number) => {
    await fetch("/api/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchNotes(); // refresh list
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-2/3">

        <h2 className="text-2xl font-bold text-center mb-6">
          Delete Notes
        </h2>

        {notes.length === 0 ? (
          <p className="text-center">No notes found</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="border-2 rounded-xl p-4 mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{note.title}</h3>
                <p>{note.content}</p>
              </div>

              <button
                onClick={() => deleteNote(note.id)}
                className="border-2 px-4 py-1 rounded-xl font-bold
                border-red-600 hover:bg-red-800 hover:text-white"
              >
                Delete
              </button>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
