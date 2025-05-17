"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    sprint: "",
    pulldown: "",
    pullups: "",
    squats: "",
    pushups: "",
    watchedBorder: "",        // <-- added here
    maggiResponse: "",
    bagCheckResponse: "",
    danceResponse: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(form as Record<string, string>).toString();
    router.push(`/result?${query}`);
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md space-y-6 border"
      >
        {/* Image Banner */}
        <div className="relative w-full h-40 mx-auto max-w-xl">
          <Image
            src="/banner.png"  // <-- your image path
            alt="VMM Guard Eligibility Test 2025 Banner"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Basic Details */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Fitness Inputs */}
        {[
          ["sprint", "Sprint Time (Delhi to Gurgaon in minutes)"],
          ["pulldown", "लाठी (Danda) Pulldown Reps"],
          ["pullups", "Pull-ups"],
          ["squats", "Squats"],
          ["pushups", "Push-ups"],
        ].map(([field, label]) => (
          <input
            key={field}
            type="number"
            name={field}
            placeholder={label}
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        ))}

        {/* New MCQ: Did you watch Border Movie? */}
        <div>
          <label className="block font-semibold mb-2">
            🎬 Did you watch Border Movie?
          </label>
          {["Yes", "No"].map((option) => (
            <label key={option} className="block mb-1">
              <input
                type="radio"
                name="watchedBorder"
                value={option}
                required
                onChange={handleChange}
                className="mr-2"
                checked={form.watchedBorder === option}
              />
              {option}
            </label>
          ))}
        </div>

        {/* Funny MCQs */}
        {[
          {
            name: "maggiResponse",
            question: "🍜 Someone steals Maggi. What do you do?",
            options: [
              "Chase them while shouting 'Thief!'",
              "Report to CCTV room and log the incident.",
              "Offer them another packet — peace is priority.",
            ],
          },
          {
            name: "bagCheckResponse",
            question: "🎒 Someone enters without bag check. Your move?",
            options: [
              "Pretend you didn’t see — not my job.",
              "Politely stop them and explain the process.",
              "Throw a flying kick (in imagination only).",
            ],
          },
          {
            name: "danceResponse",
            question: "💃 Someone starts dancing in the grocery aisle?",
            options: [
              "Join them — flashmob vibes.",
              "Request them to stop politely.",
              "Call store DJ to drop the beat.",
            ],
          },
        ].map(({ name, question, options }) => (
          <div key={name}>
            <label className="block font-semibold mb-2">{question}</label>
            {options.map((option, i) => (
              <label key={i} className="block mb-1">
                <input
                  type="radio"
                  name={name}
                  value={option}
                  required
                  onChange={handleChange}
                  className="mr-2"
                  checked={form[name as keyof typeof form] === option}
                />
                {option}
              </label>
            ))}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 bg-red-700 text-white rounded-md hover:bg-red-800"
        >
          Check Eligibility
        </button>
      </form>
    </div>
  );
}
