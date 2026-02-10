"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ensureAnonymousAuth,
  generateRoomCode,
  createRoom,
  roomExists,
} from "@/lib/firebase";
import { LandingDecor } from "./components/LandingDecor";

export default function Home() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState<"create" | "join" | null>(null);
  const [error, setError] = useState("");

  async function handleCreateRoom() {
    setError("");
    setLoading("create");
    try {
      await ensureAnonymousAuth();
      const code = generateRoomCode();
      await createRoom(code);
      router.push(`/${code}`);
    } catch (e) {
      console.error(e);
      setError("Oops, the clouds are hiding! Try again 💕");
      setLoading(null);
    }
  }

  async function handleJoinRoom(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const code = joinCode.trim().toUpperCase().replace(/\s/g, "");
    if (code.length !== 6) {
      setError("Please enter a 6-character room code 💕");
      return;
    }
    setLoading("join");
    try {
      await ensureAnonymousAuth();
      const exists = await roomExists(code);
      if (!exists) {
        setError("Room not found. Check the code and try again 💕");
        setLoading(null);
        return;
      }
      router.push(`/${code}`);
    } catch (e) {
      console.error(e);
      setError("Oops, the clouds are hiding! Try again 💕");
      setLoading(null);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[var(--bg-cream)]">
      <LandingDecor />
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12">
        <img
          src="/promise-day-logo.png"
          alt="Promise Day"
          className="mb-4 h-20 w-auto object-contain sm:h-24"
          width={192}
          height={96}
        />
        <h1
          className="font-[family-name:var(--font-chewy)] text-4xl text-[var(--text-purple)] drop-shadow-sm sm:text-5xl"
          style={{
            textShadow: "2px 2px 0px white, 4px 4px 0px rgba(0,0,0,0.05)",
            transform: "rotate(-3deg)",
          }}
        >
          Promise Day ✨
        </h1>
        <p
          className="mt-3 font-[family-name:var(--font-sniglet)] text-lg text-[var(--text-pink-dark)]"
        >
          Our promises, one room.
        </p>

        <div className="mt-10 flex w-full max-w-sm flex-col gap-4">
          <button
            type="button"
            onClick={handleCreateRoom}
            disabled={!!loading}
            className="rounded-[30px] border-2 border-[var(--stroke-brown)] bg-[var(--text-purple)] px-6 py-4 font-[family-name:var(--font-chewy)] text-xl text-white shadow-[var(--shadow-hard)] transition-[box-shadow,transform] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0_0_0_var(--stroke-brown)] disabled:opacity-70"
          >
            {loading === "create" ? "Creating… 💕" : "Create New Room"}
          </button>

          <div className="flex items-center gap-3">
            <span className="flex-1 border-t-2 border-[var(--stroke-brown)] opacity-30" />
            <span className="font-[family-name:var(--font-sniglet)] text-sm text-[var(--stroke-brown)]">or</span>
            <span className="flex-1 border-t-2 border-[var(--stroke-brown)] opacity-30" />
          </div>

          <form onSubmit={handleJoinRoom} className="flex flex-col gap-2">
            <input
              type="text"
              maxLength={6}
              placeholder="Room code (e.g. LOVE42)"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="rounded-[20px] border-2 border-[var(--stroke-brown)] bg-[#FFFBF0] px-4 py-3 font-[family-name:var(--font-nunito)] text-center text-lg font-bold uppercase tracking-widest text-[var(--stroke-brown)] outline-none placeholder:normal-case placeholder:tracking-normal focus:bg-white"
            />
            <button
              type="submit"
              disabled={!!loading}
              className="rounded-[30px] border-2 border-[var(--stroke-brown)] bg-[var(--accent-pink)] px-6 py-3 font-[family-name:var(--font-sniglet)] text-lg font-extrabold text-[var(--stroke-brown)] shadow-[var(--shadow-hard)] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0_0_0_var(--stroke-brown)] disabled:opacity-70"
            >
              {loading === "join" ? "Joining… 💕" : "Join Room"}
            </button>
          </form>
        </div>

        {error && (
          <p className="mt-4 max-w-sm text-center font-[family-name:var(--font-sniglet)] text-sm text-[var(--text-pink-dark)]">
            {error}
          </p>
        )}
      </main>
    </div>
  );
}
