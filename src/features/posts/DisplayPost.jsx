import { Button, Card, CardBody, CardHeader, CardText } from "react-bootstrap";
import sendRequest from "../../app/api";
import DisplayAuthorLink from "./DisplayAuthorLink";

//Atoms
import { useAtomValue } from "jotai";
import { authAtom } from "../../app/atoms";

export default function DisplayPost({ postData }) {
  const id = postData.id;
  const post = postData.attributes;
  const requestType = "populate_author";
  const isLoggedIn = useAtomValue(authAtom);

  const response = sendRequest(requestType, { id: id, token: isLoggedIn.token });
  if (response && response.error) {
    return <p className="text-danger">{response.error.message}</p>;
  }
  const authorData =
    response && response.data ? response.data.attributes.author.data : null;

    const isMyPost = authorData && authorData.id === isLoggedIn.userid;
const cardClassName = isMyPost ? 'card-user' : 'card'
  return (
    postData &&
    authorData && (
      <Card className={cardClassName}>
        <CardHeader>
          id: {id} - <DisplayAuthorLink authorData={authorData} />
        </CardHeader>
        <CardBody>
          <CardText>{post.text}</CardText>
          <div className="d-flex justify-content-between">
            <small className="text-muted">{post.publishedAt}</small>
            <small className="text-muted">Likes: {post.like}</small>
          </div>

          {isMyPost && (<Button className="float-end btn-secondary">Modifier</Button>)}
          {!isMyPost && (<Button className="float-end">Like</Button>)}
        </CardBody>
      </Card>
    )
  );
}
