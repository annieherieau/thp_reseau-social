// atoms
import { useAtom, useAtomValue } from "jotai";
import { authAtom, authorAtom, requestAtom, responseAtom } from "../app/atoms";

// feature components
import PostList from "../features/posts/PostsList";
import UserProfile from "../features/user/UserProfile";
import { useState } from "react";
import toHomePage from "../app/toHomePage";
import { useEffect } from "react";
import { buildRequest } from "../app/api";

export default function Profile() {
  const isLoggedIn = useAtomValue(authAtom);
  // redirection en page d'acceuil
  if (!isLoggedIn) {
    toHomePage();
  }

  const [authorId, setAuthorId] = useAtom(authorAtom);
  setAuthorId(parseInt(window.location.href.split("/").pop()));
  const [id, setId] = useState(getAuthorId(authorId, isLoggedIn.userid));

  const [requestType, setRequestType] = useState(getResquestType(authorId));

  const [request, setRequest] = useAtom(requestAtom);
  const [response, setResponse] = useAtom(responseAtom);

  // au changement de author => set: id et resquestType
  useEffect(() => {
    setId(getAuthorId(authorId, isLoggedIn.userid));
    setRequestType(getResquestType(authorId));
  }, [authorId]);

  // au changement de resquestType => set: request
  useEffect(() => {
    setRequest(buildRequest(requestType, { id: id, token: isLoggedIn.token}));
  }, [requestType]);

  // // envoyer la requête
  useEffect(() => {
    if (request) {
      fetch(request.url, request.options)
        .then((resp) => resp.json())
        .then((resp) => setResponse(resp))
        .catch((err) => console.error(err));
    }
  }, [request]);

  // affichage Erreurs
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

function getAuthorId(id, loggedId) {
  return id ? id : loggedId;
}
function getResquestType(author_id) {
  return author_id ? "read_user" : "read_user_me";
}
