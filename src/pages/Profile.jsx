// atoms
import { useAtomValue } from "jotai";

// feature components
import PostList from "../features/posts/PostsList";
import UserProfile from "../features/user/UserProfile";

export default function Profile() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const auth = useAtomValue(authAtom);
  console.log(auth);

  if (isLoggedIn) {
    return (
      <section>
        <h1>Profil {auth.username}</h1>
        <UserProfile />
        <PostList authorId={auth.userid} />
      </section>
    );
  }
}
