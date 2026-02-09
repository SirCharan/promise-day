"use client";

import type { PromiseDoc, RoomNames } from "@/lib/firebase";

interface PromiseCardProps {
  promise: PromiseDoc;
  index: number;
  names: RoomNames;
  isOptimistic?: boolean;
}

export function PromiseCard({ promise, index, names, isOptimistic }: PromiseCardProps) {
  const isHer = promise.owner === "her";
  const avatarBg = isHer ? "var(--accent-pink)" : "var(--accent-blue)";
  const displayName = isHer ? names.her : names.him;
  const initial = (displayName.trim().charAt(0) || "H").toUpperCase();
  const name = isHer ? `${names.her}'s Promise` : `${names.him}'s Promise`;
  const sticker = promise.id.charCodeAt(0) % 2 === 0 ? "heart" : "star";
  const rotateClass = index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]";
  const bgClass = index % 2 === 0 ? "bg-white" : "bg-[#F0F4FF]";

  return (
    <div
      className={`promise-card relative flex items-center gap-4 rounded-[20px] border-2 border-[var(--stroke-brown)] p-4 pr-10 shadow-[var(--shadow-hard)] transition-transform ${rotateClass} ${bgClass} ${isOptimistic ? "card-enter" : ""}`}
      style={isOptimistic ? { "--card-rotate": index % 2 === 0 ? "-1deg" : "1deg" } as React.CSSProperties : undefined}
    >
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[var(--stroke-brown)] text-2xl font-bold text-[var(--stroke-brown)]"
        style={{ background: avatarBg }}
      >
        {initial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-[family-name:var(--font-sniglet)] text-xs uppercase tracking-wide text-[var(--text-purple)]">
          {name}
        </div>
        <div className="font-[family-name:var(--font-nunito)] text-base font-bold leading-snug text-[var(--stroke-brown)]">
          {promise.text}
        </div>
      </div>
      <div className="absolute -right-2.5 -top-2.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--stroke-brown)] bg-[var(--accent-blue)]">
        {sticker === "heart" ? (
          <svg viewBox="0 0 24 24" width={16} height={16} className="text-[var(--stroke-brown)]">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#FFF"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width={16} height={16} className="text-[var(--stroke-brown)]">
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill="#FFF"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
