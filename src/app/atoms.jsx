import { atom, useAtom, useAtomValue } from "jotai";
import { loadCookie } from "./cookies";
import { useParams } from "react-router-dom";

// Atoms
export const authAtom = atom(loadCookie());

// export const requestAtom = atom({});
// export const responseAtom = atom({});
export const postsAtom = atom((response) => {
  if (response && response.data) {
    return response.data;
  } else {
    return [];
  }
});
export const myPostsAtom = atom((get, response) => {
  const auth = get(authAtom);
  if (response && response.data) {
    return response.author.data.filter((author) => author.id === auth.userid);
  } else {
    return [];
  }
});

export const postAtom = atom([]);
export const authorAtom = atom(undefined);
