import { Button, Card, CardBody, CardHeader, CardText } from "react-bootstrap";
import { sendRequest, buildRequest, handleResponse } from "../../app/api";
import DisplayAuthorLink from "./DisplayAuthorLink";
import { useAtomValue } from "jotai";
import { authAtom } from "../../app/atoms";
import { useState, useEffect } from "react";
import PostForm from "./PostForm";

export default function DisplayPost({ postData, onDelete }) {
  // VARIABLES
  const isLoggedIn = useAtomValue(authAtom);
  const id = postData.id;
  const [post, setPost] = useState(postData.attributes);

  const [toUpdate, setToUpdate] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  // requete update post
  const updateRequestType = "update_post";
  const [updateRequest, setUpdateRequest] = useState(undefined);
  const [updateResponse, setUpdateResponse] = useState(undefined);

  // pour affichage du post
  const authorData = post.author.data;
  const isMyPost = authorData && authorData.id === isLoggedIn.userid;
  const cardClassName = isMyPost ? "card-user" : "card";

  // COMPORTEMENTS

  // toggle affichage read / update
  const toggleToUpdate = () => {
    setToUpdate((toUpdate) => !toUpdate);
    setShowAlert(setShowAlert(false));
  };

  const addLike = () => {
    // créer la requête UPDATE DU POST
    setUpdateRequest(
      buildRequest(updateRequestType, {
        body: { data: { like: post.like + 1 } },
        id: id,
        token: isLoggedIn.token,
      })
    );
  };
  // soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    // récupérer les données du formulaire
    let formData = new FormData(event.target);
    let thisData = {};
    for (const [key, value] of formData.entries()) {
      thisData[key] = value;
    }
    // créer la requête UPDATE DU POST
    setUpdateRequest(
      buildRequest(updateRequestType, {
        body: { data: thisData },
        id: id,
        token: isLoggedIn.token,
      })
    );
    setToUpdate((toUpdate) => !toUpdate);
  };

  // // envoyer la requête UPDATE
  useEffect(() => {
    if (updateRequest) {
      fetch(updateRequest.url, updateRequest.options)
        .then((response) => response.json())
        .then((response) =>
          setUpdateResponse(handleResponse(updateRequestType, response))
        )
        .catch((err) => console.error(err));
    }
  }, [updateRequest]);

  // afficher le message de success
  useEffect(() => {
    if (updateResponse) {
      if (!updateResponse.error) {
        // afficher le message d'enregistrement ok
        setShowAlert(true);
        setPost(updateResponse.data.attributes);
      }
    }
  }, [updateResponse]);

  // AFFICHAGE
  return (
    postData &&
    authorData && (
      <Card className={cardClassName}>
        <CardHeader>
          id: {id} - <DisplayAuthorLink authorData={authorData} />
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-between">
            <small className="text-muted">{new Date(post.publishedAt).toLocaleString()}</small>
            <small className="text-muted">Likes: {post.like}</small>
          </div>
          {!toUpdate && <CardText>{post.text}</CardText>}
          {toUpdate && (
            <PostForm
              postText={post.text}
              targetId={updateRequestType}
              onChange={() => setShowAlert(false)}
              onSubmit={handleSubmit}
            />
          )}
          {showAlert && (
            <p className="text-end text-success m-auto">
              <small>Enregistrement OK</small>
            </p>
          )}

          {isMyPost && !toUpdate && (
            <div className="right-btn">
              <Button className="btn-danger" onClick={onDelete} id={id}>
                Supprimer
              </Button>
              <Button
                className="btn-secondary"
                onClick={() => toggleToUpdate()}
              >
                Modifier
              </Button>
            </div>
          )}
          {!isMyPost && (
            <div className="right-btn">
              <Button onClick={() => addLike()}>
                Like
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    )
  );
}
