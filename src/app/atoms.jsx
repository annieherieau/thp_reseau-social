import { atom } from "jotai";
import { loadCookie } from "./cookies";

// Atoms
export const authAtom = atom(loadCookie());
// export const isLoggedInAtom = atom((get) => {
//   return get(authAtom) ? true : false;
// });
