// atoms
import { useAtom } from "jotai";
import { authAtom } from "../../app/atoms";
import UserForm from "./UserForm";
import { useState } from "react";
import { buildRequest, handleResponse } from "../../app/api";
import { useEffect } from "react";
import { loadCookie, updateCookie } from "../../app/cookies";

export default function UserProfile({ user }) {
  const [isLoggedIn, setIsLoggedIn] = useAtom(authAtom);
  const isMe = isLoggedIn.userid === user.id;

  // afichage du message enregistrement ok
  const [showAlert, setShowAlert] = useState(false);

  const [request, setRequest] = useState(undefined);
  const requestType = "update_user_me";
  const [requestResponse, setRequestResponse] = useState(undefined);
  // requête
  const handleSubmit = (event) => {
    event.preventDefault();
    // récupérer les données du formulaire
    let formData = new FormData(event.target);
    let thisData = {};
    for (const [key, value] of formData.entries()) {
      thisData[key] = value;
    }

    // créer la requête
    setRequest(
      buildRequest(requestType, {
        body: thisData,
        id: isLoggedIn.userid,
        token: isLoggedIn.token,
      })
    );
  };
  // // envoyer la requête
  useEffect(() => {
    if (request) {
      fetch(request.url, request.options)
        .then((response) => response.json())
        .then((response) =>
          setRequestResponse(handleResponse(requestType, response))
        )
        .catch((err) => console.error(err));
    }
  }, [request]);

  // afficher le message de succes
  useEffect(() => {
    if (requestResponse) {
      if (!requestResponse.error) {
        // afficher le message d'enregistrement ok
        setShowAlert(true);
        updateCookie(requestResponse.username);
        setIsLoggedIn(loadCookie());
      }
    }
  }, [requestResponse]);

  if (isMe) {
    return (
      <div className="user-infos">
        <UserForm
          user={user}
          register={false}
          onChange={() => setShowAlert(false)}
          onSubmit={handleSubmit}
        />
        <p className="text-success text-center">
          {" "}
          {showAlert && <small>OK enregistré</small>}
        </p>
      </div>
    );
  } else {
    return (
      <div className="user-infos">
        <p>{user.username}</p>
        <p>{user.description}</p>
      </div>
    );
  }
}
