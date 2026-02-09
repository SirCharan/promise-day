import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInAnonymously,
  type Auth,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type Firestore,
  type Unsubscribe,
  type DocumentReference,
  type CollectionReference,
  Timestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function getApp(): FirebaseApp {
  const apps = getApps();
  if (apps.length > 0) return apps[0] as FirebaseApp;
  const app = initializeApp(firebaseConfig);
  if (typeof window !== "undefined") {
    getAnalytics(app);
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  return getAuth(getApp());
}

export function getFirebaseDb(): Firestore {
  return getFirestore(getApp());
}

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous 0/O, 1/I

export function generateRoomCode(): string {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint8Array(6);
    crypto.getRandomValues(arr);
    return Array.from(arr, (b) => CODE_CHARS[b % CODE_CHARS.length]).join("");
  }
  return Array.from({ length: 6 }, () =>
    CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
  ).join("");
}

export async function ensureAnonymousAuth(): Promise<User | null> {
  const auth = getFirebaseAuth();
  if (auth.currentUser) return auth.currentUser;
  const cred = await signInAnonymously(auth);
  return cred.user;
}

export type Owner = "her" | "him";

export interface PromiseDoc {
  id: string;
  text: string;
  owner: Owner;
  createdAt: Timestamp;
}

export interface RoomNames {
  her: string;
  him: string;
}

export const DEFAULT_ROOM_NAMES: RoomNames = { her: "Her", him: "Him" };

export function roomRef(roomId: string): DocumentReference {
  const db = getFirebaseDb();
  return doc(db, "rooms", roomId.toUpperCase());
}

export async function createRoom(roomId: string): Promise<void> {
  await setDoc(roomRef(roomId), {
    createdAt: serverTimestamp(),
    nameHer: DEFAULT_ROOM_NAMES.her,
    nameHim: DEFAULT_ROOM_NAMES.him,
  });
}

export async function roomExists(roomId: string): Promise<boolean> {
  const snap = await getDoc(roomRef(roomId));
  return snap.exists();
}

export function promisesRef(roomId: string): CollectionReference {
  const db = getFirebaseDb();
  return collection(db, "rooms", roomId.toUpperCase(), "promises");
}

export async function addPromise(
  roomId: string,
  text: string,
  owner: Owner
): Promise<DocumentReference> {
  const ref = promisesRef(roomId);
  return addDoc(ref, {
    text,
    owner,
    createdAt: serverTimestamp(),
  });
}

export function subscribePromises(
  roomId: string,
  onUpdate: (promises: PromiseDoc[]) => void
): Unsubscribe {
  const ref = promisesRef(roomId);
  const q = query(ref, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => {
      const promises: PromiseDoc[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          text: data.text ?? "",
          owner: (data.owner as Owner) ?? "her",
          createdAt: data.createdAt ?? Timestamp.now(),
        };
      });
      onUpdate(promises);
    },
    (err) => {
      console.error("Firestore subscribe error:", err);
      onUpdate([]);
    }
  );
}

export function subscribeRoom(
  roomId: string,
  onUpdate: (names: RoomNames) => void
): Unsubscribe {
  const ref = roomRef(roomId);
  return onSnapshot(
    ref,
    (snap) => {
      const data = snap.data();
      onUpdate({
        her: (data?.nameHer as string) ?? DEFAULT_ROOM_NAMES.her,
        him: (data?.nameHim as string) ?? DEFAULT_ROOM_NAMES.him,
      });
    },
    (err) => {
      console.error("Firestore room subscribe error:", err);
      onUpdate(DEFAULT_ROOM_NAMES);
    }
  );
}

export async function updateRoomNames(
  roomId: string,
  names: Partial<RoomNames>
): Promise<void> {
  const ref = roomRef(roomId);
  const updates: Record<string, string> = {};
  if (names.her !== undefined) updates.nameHer = names.her;
  if (names.him !== undefined) updates.nameHim = names.him;
  await setDoc(ref, updates, { merge: true });
}
