"use client";

import { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function AllNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  return (
    <div className="flex justify-center mt-10">
      <div className="w-2/3">

        <h2 className="text-2xl font-bold text-center mb-6">
          All Notes
        </h2>

        {notes.length === 0 ? (
          <p className="text-center">No notes found</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="border-2 border-blue-600 rounded-xl p-4 mb-4"
            >
              <h3 className="font-bold text-lg">{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
