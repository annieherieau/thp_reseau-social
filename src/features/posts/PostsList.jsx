import { ListGroup } from "react-bootstrap";
import sendRequest from "../../app/api";
import DisplayPost from "./DisplayPost";

export default function PostList({authorId}) {
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2MTk1MTM2LCJleHAiOjE3MTg3ODcxMzZ9.4uGdJ_Bn1m6V0D-Vam2z22DV0cOndo1-kBrK78LGTRU"
  const requestType = "posts";
  const response = sendRequest(requestType, {id: authorId, token: token});
  if(response && response.error){
    return <p className="text-danger">{response.error.message}</p>
  }
  return (
    <ListGroup className="gap-3">
      {response && response.data &&
        response.data.map((post) => (
          <DisplayPost postData={post} key={post.id} />
        ))}
    </ListGroup>
  );
}
