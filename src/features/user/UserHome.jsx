// atoms
import { useAtomValue } from "jotai";
import { authAtom, isLoggedInAtom } from "../app/atoms";

import PostForm from "../posts/PostForm";
import PostList from "../posts/PostsList";

export default function UserHome(){
  const auth = useAtomValue(authAtom);
  return (
    <>
    <h2>Bonjour</h2>
    <PostForm/>
    <PostList authorId = {null}/>
    </>
  )
}