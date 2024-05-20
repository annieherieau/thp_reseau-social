import { useState, useEffect } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { buildRequest, handleResponse } from "../app/api";
import { useAtomValue } from "jotai";
import { isLoggedInAtom } from "../app/atoms";

export default function Regiter() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

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
      <Form className="form-login" onSubmit={handleRegister}>
        <FormGroup className="form-group">
          <Form.Label>Identifiant</Form.Label>
          <Form.Control type="text" required name="username" />
        </FormGroup>
        <FormGroup className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required name="email" />
        </FormGroup>
        <FormGroup className="form-group">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" required name="password" />
        </FormGroup>
        <Button type="submit">Soumettre</Button>
      </Form>
    </section>
  );
}
