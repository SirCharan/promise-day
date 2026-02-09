"use client";

import { useState, useRef } from "react";
import type { Owner } from "@/lib/firebase";

interface CloudInputProps {
  owner: Owner;
  onOwnerChange: (owner: Owner) => void;
  onSubmit: (text: string) => void;
}

export function CloudInput({ owner, onOwnerChange, onSubmit }: CloudInputProps) {
  const [text, setText] = useState("");
  const [burst, setBurst] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onSubmit(t);
    setText("");
    setBurst(true);
    setTimeout(() => setBurst(false), 600);
  }

  return (
    <div
      className="input-cloud-container fixed bottom-0 left-0 z-10 flex w-full justify-center px-4 py-4"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 0, white 25px, transparent 26px),
          radial-gradient(circle at 50% -10px, white 35px, transparent 36px),
          radial-gradient(circle at 80% 0, white 25px, transparent 26px)
        `,
        pointerEvents: "none",
      }}
    >
      <div
        className="input-cloud-body relative w-full max-w-[500px] rounded-t-[40px] border-t-[3px] border-[var(--stroke-brown)] bg-white pb-8 pt-6 shadow-[0_-4px_20px_rgba(74,59,44,0.15)]"
        style={{ pointerEvents: "auto" }}
      >
        <div className="absolute left-0 top-0 z-[1] h-2.5 w-full bg-white" />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onOwnerChange("her")}
            className={`flex-1 rounded-[30px] border-2 border-[var(--stroke-brown)] px-4 py-3 text-center font-[family-name:var(--font-sniglet)] font-extrabold transition-all ${
              owner === "her"
                ? "translate-x-[-1px] translate-y-[-1px] bg-[var(--accent-pink)] text-[var(--stroke-brown)] shadow-[2px_2px_0_var(--stroke-brown)]"
                : "bg-[#F5F5F5] text-[#AAA]"
            }`}
          >
            Me (Her 💕)
          </button>
          <button
            type="button"
            onClick={() => onOwnerChange("him")}
            className={`flex-1 rounded-[30px] border-2 border-[var(--stroke-brown)] px-4 py-3 text-center font-[family-name:var(--font-sniglet)] font-extrabold transition-all ${
              owner === "him"
                ? "translate-x-[-1px] translate-y-[-1px] bg-[var(--accent-blue)] text-[var(--stroke-brown)] shadow-[2px_2px_0_var(--stroke-brown)]"
                : "bg-[#F5F5F5] text-[#AAA]"
            }`}
          >
            Me (Him 💙)
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a sweet promise here..."
            rows={3}
            className="h-20 w-full resize-none rounded-[20px] border-2 border-[var(--stroke-brown)] bg-[#FFFBF0] px-4 py-3 font-[family-name:var(--font-nunito)] text-base font-bold text-[var(--stroke-brown)] outline-none placeholder:font-normal focus:bg-white"
          />
          <button
            type="submit"
            className="submit-btn rounded-[30px] border-2 border-[var(--stroke-brown)] bg-[var(--text-purple)] px-5 py-3 font-[family-name:var(--font-chewy)] text-xl text-white shadow-[var(--shadow-hard)] transition-[box-shadow,transform]"
          >
            Seal It! 🤞
          </button>
        </form>
        {burst && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <span className="animate-ping text-4xl opacity-70">💕</span>
          </div>
        )}
      </div>
    </div>
  );
}
