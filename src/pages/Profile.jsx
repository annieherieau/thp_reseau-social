// atoms
import { useAtomValue } from "jotai";
import { authAtom } from "../app/atoms";

// feature components
import PostList from "../features/posts/PostsList";
import UserProfile from "../features/user/UserProfile";
import { useParams } from "react-router-dom";
import { useState } from "react";
import toHomePage from "../app/toHomePage";
import { useEffect } from "react";
import { buildRequest, handleResponse } from "../app/api";

export default function Profile() {
  const isLoggedIn = useAtomValue(authAtom);
  if (!isLoggedIn) {
    toHomePage();
  }
  const [request, setRequest] = useState(undefined);
  const [response, setResponse] = useState(undefined);
  const [authorId, setAuthorId] = useState(parseInt(useParams().authorId));
  const [id, setId] = useState(authorId ? authorId : isLoggedIn.userid);

  // requête API
  const requestType = authorId ? "read_user" : "read_user_me";
  // créer la requête au changement de authorid
  useEffect(() => {
    setRequest(
      buildRequest(requestType, {
        id: id,
        token: isLoggedIn.token,
      })
    );
  }, [authorId]);

  // // envoyer la requête
  useEffect(() => {
    if (request) {
      fetch(request.url, request.options)
        .then((response) => response.json())
        .then((response) => setResponse(handleResponse(requestType, response)))
        .catch((err) => console.error(err));
    }
  }, [request]);

  // afichage Erreurs
  if (response && response.error) {
    return <p className="text-danger">{response.error.message}</p>;
  }
  if (isLoggedIn && response) {
    return (
      <section>
        <h1>Utilisateur</h1>
        <h2>informations</h2>
        <UserProfile user={response} />
        <h2>Posts</h2>
        <PostList userId={id} />
      </section>
    );
  }
}
