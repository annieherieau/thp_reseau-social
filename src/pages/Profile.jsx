// atoms
import { useAtom, useAtomValue } from "jotai";
import { authAtom, authorAtom } from "../app/atoms";

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
   // déterminer l'id de l'author (userme ou userX)
   const [authorId, setAuthorId] = useAtom(authorAtom); 
   setAuthorId(parseInt(window.location.href.split("/").pop()));
   const [id, setId] = useState(getAuthorId(authorId, isLoggedIn.userid));
 

  // option de la requete (userme ou userX)
  const [requestType, setRequestType] = useState(getResquestType(authorId));
  const [request, setRequest] = useState({});
  const [response, setResponse] = useState({});

  // au changement de author => set: id et resquestType
  useEffect(() => {
    setId(getAuthorId(authorId, isLoggedIn.userid));
    setRequestType(getResquestType(authorId));
  }, [authorId]);

  // au changement de resquestType => set: request
  useEffect(() => {
    setRequest(buildRequest(requestType, { id: id, token: isLoggedIn.token}));
  }, [requestType]);

  // FETCH la requête => set: response
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

  // AFFICHAGE DE LA PAGE
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