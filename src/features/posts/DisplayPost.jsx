import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText
} from "react-bootstrap";
import sendRequest from "../../app/api";
import DisplayAuthorLink from "./DisplayAuthorLink";

export default function DisplayPost({ postData }) {
  const id = postData.id;
  const post = postData.attributes;
  const requestType = "populate_author";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2MTk1MTM2LCJleHAiOjE3MTg3ODcxMzZ9.4uGdJ_Bn1m6V0D-Vam2z22DV0cOndo1-kBrK78LGTRU";

  const response = sendRequest(requestType, { id: id, token: token });
  if (response && response.error) {
    return <p className="text-danger">{response.error.message}</p>;
  }
  const authorData = response && response.data ? response.data.attributes.author.data : null;

  return (
    postData && authorData && (
      <Card>
        <CardHeader>id: {id} - <DisplayAuthorLink authorData = {authorData} /></CardHeader>
        <CardBody>
          <CardText>{post.text}</CardText>
          <div className="d-flex justify-content-between">
          <small className="text-muted">{post.publishedAt}</small>
          <small className="text-muted">Likes: {post.like}</small>
          </div>
          
          <Button className="float-end">Like</Button>
        </CardBody>
      </Card>
    )
  );
}
