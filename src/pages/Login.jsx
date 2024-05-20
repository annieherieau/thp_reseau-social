import { useState, useEffect } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { buildRequest, handleResponse } from "../app/api";
import { useAtomValue } from "jotai";
import { isLoggedInAtom } from "../app/atoms";

export default function Login() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  
  const [request, setRequest] = useState(undefined);
  const [requestData, setRequestData] = useState(undefined);

  // // si login redirection profil

  const handleLogin = (event) => {
    event.preventDefault();
    // récupérer les données du formulaire
    let form_data = new FormData(event.target);
    let thisData = {};
    for (const [key, value] of form_data.entries()) {
      thisData[key] = value;
    }

    // créer la requête
    setRequest(
      buildRequest("login", {
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
      <h1>Connexion</h1>
      <Form className="form-login" onSubmit={handleLogin}>
        <FormGroup className="form-group">
          <Form.Label>Identifiant</Form.Label>
          <Form.Control type="text" required name="identifier" />
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
