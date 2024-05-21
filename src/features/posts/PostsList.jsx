import { ListGroup} from "react-bootstrap";
import { sendRequest, buildRequest, handleResponse } from "../../app/api";
import DisplayPost from "./DisplayPost";

// Atom
import { useAtomValue } from "jotai";
import { authAtom } from "../../app/atoms";
import { useState } from "react";
import { useEffect } from "react";

export default function PostList({ userId }) {
  const isLoggedIn = useAtomValue(authAtom);

  // requete API
  const requestType = userId ? "posts_author" : "posts";
  const [deleteRequest, setDeleteRequest] = useState(undefined);
  const response = sendRequest(requestType, {
    id: userId,
    token: isLoggedIn.token,
  });

  // afichage Erreurs
  if (response && response.error) {
    return <p className="text-danger">{response.error.message}</p>;
  }

  // DELETE POST
  function deletePost(event) {
    // créer la requête UPDATE DU POST
    setDeleteRequest(
      buildRequest("delete_post", {
        id: event.target.id,
        token: isLoggedIn.token,
        body: null
      })
    );
  }

  // // envoyer la requête UPDATE
  useEffect(() => {
    if (deleteRequest) {
      fetch(deleteRequest.url, deleteRequest.options)
        .then((response) => response.json())
        .then((response) =>
          setDeleteRequest(handleResponse("delete_post", response))
        )
        .catch((err) => console.error(err))
    }
  }, [deleteRequest]);

  // affichage des Posts
  return (
    <ListGroup className="gap-3">
      {response &&
        response.data &&
        response.data.map((post) => (
          <DisplayPost postData={post} key={post.id} onDelete={deletePost} />
        ))}
    </ListGroup>
  );
}
