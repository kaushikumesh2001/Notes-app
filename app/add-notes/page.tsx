"use client";

import { useState } from "react";

export default function AddNotesPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddNote = async () => {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    setLoading(false);

    alert("Note added successfully");
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-96 flex flex-col gap-4">

        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 p-2 rounded"
        />

        <textarea
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border-2 p-2 rounded"
        />

        <button
          onClick={handleAddNote}
          disabled={loading}
          className="border-2 rounded-2xl px-6 p-2 font-bold
          border-blue-600 hover:bg-blue-800 hover:text-white transition"
        >
          {loading ? "Saving..." : "Add Notes"}
        </button>

      </div>
    </div>
  );
}
