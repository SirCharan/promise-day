"use client";

import { useState, useRef } from "react";
import type { Owner } from "@/lib/firebase";

interface CloudInputProps {
  roomId: string;
  owner: Owner;
  onOwnerChange: (owner: Owner) => void;
  onSubmit: (text: string) => void;
}

function shareUrl(roomId: string): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/${roomId}`;
}

function shareText(roomId: string): string {
  return `Join our promise room! Code: ${roomId}\n${shareUrl(roomId)}`;
}

export function CloudInput({ roomId, owner, onOwnerChange, onSubmit }: CloudInputProps) {
  const [text, setText] = useState("");
  const [burst, setBurst] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleShareWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText(roomId))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleShareTelegram() {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl(roomId))}&text=${encodeURIComponent(`Join our promise room! Code: ${roomId}`)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

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
        <div className="mb-2 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border-2 border-[var(--stroke-brown)] bg-[#FFFBF0] px-3 py-1 font-[family-name:var(--font-sniglet)] text-sm font-bold text-[var(--stroke-brown)]">
            Room {roomId}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="inline-flex items-center justify-center rounded-full border-2 border-[var(--stroke-brown)] bg-[#FFFBF0] p-1.5 transition hover:bg-[#E8F5E9] active:scale-95"
              title="Share via WhatsApp"
              aria-label="Share via WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleShareTelegram}
              className="inline-flex items-center justify-center rounded-full border-2 border-[var(--stroke-brown)] bg-[#FFFBF0] p-1.5 transition hover:bg-[#E3F2FD] active:scale-95"
              title="Share via Telegram"
              aria-label="Share via Telegram"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </button>
          </div>
        </div>
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
            Her 💕
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
            Him 💙
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
