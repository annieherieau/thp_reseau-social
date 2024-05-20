import { ListGroup } from "react-bootstrap";
import sendRequest from "../../app/api";
import DisplayPost from "./DisplayPost";

// Atom
import { useAtomValue } from "jotai";
import { authAtom } from "../../app/atoms";

export default function PostList({ authorId }) {
  const isLoggedIn = useAtomValue(authAtom);

  // requete API
  const requestType = authorId ? "posts_author" : "posts";
  const response = sendRequest(requestType, {
    id: authorId,
    token: isLoggedIn.token,
  });

  // afichage Erreurs
  if (response && response.error) {
    return <p className="text-danger">{response.error.message}</p>;
  }

  // affichae des Posts
  return(
    <ListGroup className="gap-3">
      {response && response.data && response.data.map((post) => (
        <DisplayPost postData={post} key={post.id} />
      ))}
    </ListGroup>
  )
}
