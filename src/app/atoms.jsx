import { atom } from "jotai";
import { loadCookie } from "./cookies";

// Atoms
export const authAtom = atom(loadCookie());