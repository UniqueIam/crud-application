"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    try {
      f
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${API_URL}/api/topics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        const errorData = await res.json();
        throw new Error(`Failed to create a topic: ${errorData.message || res.statusText}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while creating the topic.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
}
