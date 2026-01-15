"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <h1 className="text-center text-3xl font-bold text-blue-700">
        <u>My Notes</u>
      </h1>

      <div className="flex flex-col gap-6 items-center mt-28">

        <button
          onClick={() => router.push("/add-notes")}
          className="btn"
        >
          Add Notes
        </button>

        <button
          onClick={() => router.push("/all-notes")}
          className="btn"
        >
          All Notes
        </button>

        <button
          onClick={() => router.push("/update-notes")}
          className="btn"
        >
          Update Notes
        </button>

        <button
          onClick={() => router.push("/delete-notes")}
          className="btn"
        >
          Delete Notes
        </button>

      </div>
    </>
  );
}
