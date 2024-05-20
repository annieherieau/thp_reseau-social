// atoms
import { useAtomValue } from "jotai";
import { authAtom } from "../app/atoms";

// feature components
import PostList from "../features/posts/PostsList";
import UserProfile from "../features/user/UserProfile";
import { useParams } from "react-router-dom";
import sendRequest from "../app/api";
import { useState } from "react";
import toHomePage from "../app/toHomePage";

export default function Profile() {
  const isLoggedIn = useAtomValue(authAtom);
  if (!isLoggedIn) {
    toHomePage();
  }
  const [authorId, setAuthorId] = useState(parseInt(useParams().authorId));
  const id = authorId ? authorId : isLoggedIn.userid;

  // requête API
  const requestType = authorId ? "read_user" : "read_user_me";
  console.log(requestType);
  const response = sendRequest(requestType, {
    id: id,
    token: isLoggedIn.token,
  });

  // afichage Erreurs
  if (response && response.error) {
    return <p className="text-danger">{response.error.message}</p>;
  }

  console.log(response);

  if (isLoggedIn && response) {
    return (
      <section>
        <h1>Utilisateur</h1>
        <h2>informations</h2>
        <UserProfile />
        <h2>Posts</h2>
        <PostList authorId={id} />
      </section>
    );
  }
}
