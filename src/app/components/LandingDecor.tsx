"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#FFB7C5", "#89CFF0", "#FFF59D", "#E1BEE7"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function LandingDecor() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    for (let i = 0; i < 12; i++) {
      const type = Math.random() > 0.6 ? "heart" : Math.random() > 0.5 ? "star" : "circle";
      const el = document.createElement("div");
      el.className = "decor-item";
      el.style.left = Math.random() * 90 + "%";
      el.style.top = Math.random() * 85 + "%";
      el.style.transform = `scale(${0.5 + Math.random()}) rotate(${Math.random() * 360}deg)`;
      const color = pick(COLORS);
      if (type === "heart") {
        el.innerHTML = `<svg class="decor-heart" viewBox="0 0 24 24" width="28" height="28" fill="${color}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      } else if (type === "star") {
        el.innerHTML = `<svg class="decor-star" viewBox="0 0 24 24" width="28" height="28" fill="${color}"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
      } else {
        el.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="10" fill="${color}"/></svg>`;
      }
      layer.appendChild(el);
    }
    return () => {
      layer.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    />
  );
}
