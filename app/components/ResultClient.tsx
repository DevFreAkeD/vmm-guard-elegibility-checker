"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Result() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper parsers
  function parseNumberParam(param: string | null, fallback: number) {
    if (!param) return fallback;
    const parsed = Number(param);
    return isNaN(parsed) ? fallback : parsed;
  }

  function parseStringParam(param: string | null) {
    return param ?? "";
  }

  // Get name for greeting
  const name = searchParams.get("name") ?? "Candidate";

  // State for scores
  const [scores, setScores] = useState({
    fitnessScore: 0,
    mcqScore: 0,
    totalScore: 0,
    rank: "Rejected 😓",
  });

  useEffect(() => {
    // Play audio once component mounts
    const audio = new Audio("/vmm-theme.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    // Extract all params from searchParams
    const sprint = parseNumberParam(searchParams.get("sprint"), 999);
    const pulldown = parseNumberParam(searchParams.get("pulldown"), 0);
    const pullups = parseNumberParam(searchParams.get("pullups"), 0);
    const squats = parseNumberParam(searchParams.get("squats"), 0);
    const pushups = parseNumberParam(searchParams.get("pushups"), 0);

    const maggiResponse = parseStringParam(searchParams.get("maggiResponse"));
    const bagCheckResponse = parseStringParam(searchParams.get("bagCheckResponse"));
    const watchedBorder = parseStringParam(searchParams.get("watchedBorder"));
    const danceResponse = parseStringParam(searchParams.get("danceResponse"));

    // Calculate fitness score
    let fitnessScore = 0;
    if (sprint <= 20) fitnessScore += 1;
    if (pulldown >= 20) fitnessScore += 1;
    if (pullups >= 5) fitnessScore += 1;
    if (squats >= 30) fitnessScore += 1;
    if (pushups >= 20) fitnessScore += 1;

    // Calculate MCQ score
    let mcqScore = 0;
    if (maggiResponse === "Report to CCTV room and log the incident.") mcqScore += 1;
    if (bagCheckResponse === "Politely stop them and explain the process.") mcqScore += 1;
    if (watchedBorder === "Yes") mcqScore += 1;
    if (danceResponse === "Request them to stop politely.") mcqScore += 1;

    const totalScore = fitnessScore + mcqScore;

    let rank = "Rejected 😓";
    if (totalScore >= 8) rank = "Elite Guard 🥷";
    else if (totalScore >= 6) rank = "Trainee Guard 🚨";

    setScores({ fitnessScore, mcqScore, totalScore, rank });
  }, [searchParams]);

  // Programmatic navigation handlers
  const handleRetry = () => {
    router.push("/");
  };

  const handleHome = () => {
    router.push("/");
  };

  // For rendering ticks and crosses
  const sprint = parseNumberParam(searchParams.get("sprint"), 999);
  const pulldown = parseNumberParam(searchParams.get("pulldown"), 0);
  const pullups = parseNumberParam(searchParams.get("pullups"), 0);
  const squats = parseNumberParam(searchParams.get("squats"), 0);
  const pushups = parseNumberParam(searchParams.get("pushups"), 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="bg-white p-8 rounded-xl max-w-xl w-full text-center shadow-md space-y-6 border border-gray-300">
        {/* Image Banner */}
        <div className="relative w-full h-40 mx-auto max-w-xl">
          <Image
            src="/banner.png"
            alt="VMM Guard Eligibility Test 2025 Banner"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Greeting */}
        <p className="text-2xl text-black font-semibold mt-4 mb-6">Hi, {name}!</p>

        {/* Rank and Score */}
        <p className="text-lg text-black font-medium mb-2">
          Rank:{" "}
          <span
            className={
              scores.rank === "Rejected 😓" ? "text-red-600" : "text-green-600"
            }
          >
            {scores.rank}
          </span>
        </p>
        <p className="mb-4 text-gray-700">
          You scored <strong>{scores.totalScore}</strong> / 9
        </p>

        {/* Scores breakdown */}
        <div className="bg-gray-50 rounded p-4 text-left text-md text-gray-600 space-y-2">
          <p>
            <strong>🏃 Fitness Score:</strong> {scores.fitnessScore} / 5
          </p>
          <ul className="list-disc pl-5">
            <li>Sprint ≤ 20 mins: {sprint <= 20 ? "✅" : "❌"}</li>
            <li>लाठी Pulldown ≥ 20: {pulldown >= 20 ? "✅" : "❌"}</li>
            <li>Pullups ≥ 5: {pullups >= 5 ? "✅" : "❌"}</li>
            <li>Squats ≥ 30: {squats >= 30 ? "✅" : "❌"}</li>
            <li>Pushups ≥ 20: {pushups >= 20 ? "✅" : "❌"}</li>
          </ul>
          <p>
            <strong>🧠 Logic Score:</strong> {scores.mcqScore} / 4
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleRetry}
            className="inline-block bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
          >
            🔁 Retry Test
          </button>
          <button
            onClick={handleHome}
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}