import { ListGroup } from "react-bootstrap";
import { sendRequest, buildRequest} from "../../app/api";
import DisplayPost from "./DisplayPost";

// Atom
import { useAtom, useAtomValue } from "jotai";
import { authAtom, authorAtom } from "../../app/atoms";
import { useState } from "react";
import { useEffect } from "react";

export default function PostList({ onDelete }) {
  const isLoggedIn = useAtomValue(authAtom);
   // déterminer l'id de l'author (userme ou userX)
   const [authorId, setAuthorId] = useAtom(authorAtom); 
  //  setAuthorId(parseInt(window.location.href.split("/").pop()));
   const [id, setId] = useState(getAuthorId(authorId, isLoggedIn.userid));
  // requete API
  const requestType = authorId ? "posts_author" : "posts";
  const response = sendRequest(requestType, {
    id: id,
    token: isLoggedIn.token
  });

  // afichage Erreurs
  if (response && response.error) {
    return <p className="text-danger">{response.error.message}</p>;
  }

  // affichage des Posts
  return (
    <ListGroup className="gap-3 my-4">
      {response &&
        response.data &&
        response.data.map((post) => (
          <DisplayPost postData={post} key={post.id} onDelete={onDelete} />
        ))}
    </ListGroup>
  );
}

function getAuthorId(id, loggedId) {
  return id ? id : loggedId;
}
