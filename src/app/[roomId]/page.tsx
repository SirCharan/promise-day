"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  ensureAnonymousAuth,
  subscribePromises,
  addPromise as addPromiseToFirestore,
  roomExists,
  type PromiseDoc,
  type Owner,
} from "@/lib/firebase";
import { RoomDecor } from "../components/RoomDecor";
import { PromiseCard } from "../components/PromiseCard";
import { CloudInput } from "../components/CloudInput";

const OWNER_KEY = "promise-day-owner";

function getStoredOwner(): Owner {
  if (typeof window === "undefined") return "her";
  const s = localStorage.getItem(OWNER_KEY);
  if (s === "him" || s === "her") return s;
  return "her";
}

function setStoredOwner(owner: Owner) {
  if (typeof window === "undefined") return;
  localStorage.setItem(OWNER_KEY, owner);
}

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = (params?.roomId as string)?.toUpperCase() ?? "";
  const [owner, setOwner] = useState<Owner>("her");
  const [promises, setPromises] = useState<PromiseDoc[]>([]);
  const [ready, setReady] = useState(false);
  const [roomValid, setRoomValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const optimisticIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    setOwner(getStoredOwner());
  }, []);

  useEffect(() => {
    if (!roomId || roomId.length !== 6) {
      setRoomValid(false);
      setReady(true);
      return;
    }
    let mounted = true;
    (async () => {
      try {
        await ensureAnonymousAuth();
        if (!mounted) return;
        const exists = await roomExists(roomId);
        if (!mounted) return;
        setRoomValid(exists);
        if (!exists) {
          setReady(true);
          return;
        }
        setReady(true);
      } catch (e) {
        if (mounted) {
          setError("Oops, the clouds are hiding! Try again 💕");
          setRoomValid(false);
          setReady(true);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [roomId]);

  useEffect(() => {
    if (!roomId || roomId.length !== 6 || !roomValid) return;
    const unsub = subscribePromises(roomId, (next) => {
      setPromises(next);
    });
    return () => unsub();
  }, [roomId, roomValid]);

  const handleNewPromise = useCallback(
    (text: string, owner: Owner) => {
      const tempId = `opt-${Date.now()}`;
      const optimistic: PromiseDoc = {
        id: tempId,
        text,
        owner,
        createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 } as any,
      };
      optimisticIds.current.add(tempId);
      setPromises((prev) => [optimistic, ...prev]);
      addPromiseToFirestore(roomId, text, owner).catch(() => {
        setError("Couldn’t save. Try again 💕");
        setPromises((prev) => prev.filter((p) => p.id !== tempId));
        optimisticIds.current.delete(tempId);
      });
    },
    [roomId, promises.length]
  );

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-cream)]">
        <p className="font-[family-name:var(--font-sniglet)] text-[var(--text-purple)]">Loading… 💕</p>
      </div>
    );
  }

  if (!roomValid || !roomId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--bg-cream)] px-6">
        <p className="text-center font-[family-name:var(--font-sniglet)] text-[var(--text-pink-dark)]">
          {error || "Room not found. Check the code and try again 💕"}
        </p>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-[30px] border-2 border-[var(--stroke-brown)] bg-[var(--text-purple)] px-5 py-2 font-[family-name:var(--font-chewy)] text-white shadow-[var(--shadow-hard)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0_0_0_var(--stroke-brown)]"
        >
          Back home
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[var(--bg-cream)]">
      <RoomDecor />
      <header className="relative z-[2] px-4 pt-6 pb-2 text-center">
        <h1
          className="font-[family-name:var(--font-chewy)] text-3xl text-[var(--text-purple)] sm:text-4xl"
          style={{
            textShadow: "2px 2px 0px white, 4px 4px 0px rgba(0,0,0,0.05)",
            transform: "rotate(-3deg)",
          }}
        >
          Our Promises ✨
        </h1>
        <h2 className="mt-2 inline-block rounded-[20px] border-2 border-[var(--stroke-brown)] bg-white px-4 py-2 font-[family-name:var(--font-sniglet)] text-base text-[var(--text-pink-dark)] shadow-[var(--shadow-hard)] sm:text-lg">
          This Year, I Vow To...
        </h2>
      </header>

      <main className="relative z-[2] flex flex-1 flex-col gap-4 px-4 pb-[220px] pt-2">
        {error && (
          <p className="text-center font-[family-name:var(--font-sniglet)] text-sm text-[var(--text-pink-dark)]">
            {error}
          </p>
        )}
        <div className="flex flex-col gap-4">
          {promises.length === 0 ? (
            <div className="empty-state mt-6 text-center font-[family-name:var(--font-sniglet)] text-[var(--stroke-brown)] opacity-60">
              No promises yet. Add one below and seal it! 🤞💕
            </div>
          ) : (
            promises.map((p, i) => (
              <PromiseCard
                key={p.id}
                promise={p}
                index={i}
                isOptimistic={optimisticIds.current.has(p.id)}
              />
            ))
          )}
        </div>
      </main>

      <CloudInput
        roomId={roomId}
        owner={owner}
        onOwnerChange={(o) => {
          setOwner(o);
          setStoredOwner(o);
        }}
        onSubmit={(text) => handleNewPromise(text, owner)}
      />
    </div>
  );
}
