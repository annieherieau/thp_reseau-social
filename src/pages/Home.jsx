// atoms
import { useAtomValue } from "jotai";
import { isLoggedInAtom } from "../app/atoms";

// features
import PostList from "../features/posts/PostsList";
import Visitor from "../features/user/Visitor";

export default function Home() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <section>
      <h1>Mini-Twitter</h1>
      {isLoggedIn ? <PostList /> : <Visitor />}
    </section>
  );
}
