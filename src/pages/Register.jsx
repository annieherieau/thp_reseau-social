import { useState, useEffect } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { buildRequest, handleResponse } from "../app/api";
import { useAtomValue } from "jotai";
import { authAtom } from "../app/atoms";
import UserForm from "../features/user/UserForm";

export default function Regiter() {
  const isLoggedIn = useAtomValue(authAtom);

  const [request, setRequest] = useState(undefined);
  const [requestData, setRequestData] = useState(undefined);

  // // si login redirection profil

  const handleRegister = (event) => {
    event.preventDefault();
    // récupérer les données du formulaire
    let form_data = new FormData(event.target);
    let thisData = {};
    for (const [key, value] of form_data.entries()) {
      thisData[key] = value;
    }
    // créer la requête
    setRequest(
      buildRequest("register", {
        body: thisData,
        id: null,
        token: null,
      })
    );
  };
  // // envoyer la requête
  useEffect(() => {
    if (request) {
      fetch(request.url, request.options)
        .then((response) => response.json())
        .then((response) => setRequestData(handleResponse("login", response)))
        .catch((err) => console.error(err));
    }
  }, [request]);

  return (
    <section>
      <h1>Inscription</h1>
      <UserForm register={true} onSubmit={handleRegister} />
    </section>
  );
}
