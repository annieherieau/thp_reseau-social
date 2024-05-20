// import { useState } from "react";
// import { Button, Form, FormGroup } from "react-bootstrap";
// import { buildRequest, handleResponse } from "../app/api";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { redirect } from "react-router-dom";
// import { addToken } from "../features/user/userActions";

export default function Login() {
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // const dispatch = useDispatch();
  // // const [formData, setFormData] = useState(undefined);
  // const [request, setRequest] = useState(undefined);
  // const [requestData, setRequestData] = useState(undefined);

  // // si login redirection profil

  // const handleLogin = (event) => {
  //   event.preventDefault();
  //   // récupérer les données du formulaire
  //   let form_data = new FormData(event.target);
  //   let thisData = {};
  //   for (const [key, value] of form_data.entries()) {
  //     thisData[key] = value;
  //   }
  //   // setFormData(thisData);
  //   // créer la requête
  //   setRequest(
  //     buildRequest("login", {
  //       body: thisData,
  //       id: null,
  //       token: null,
  //     })
  //   );
  // };
  // // envoyer la requête
  // useEffect(() => {
  //   if (request) {
  //     fetch(request.url, request.options)
  //       .then((response) => response.json())
  //       .then((response) => setRequestData(handleResponse("login", response)))
  //       .catch((err) => console.error(err));
  //   }
    
  // }, [request]);

  // useEffect(()=>{
  //   if (requestData && requestData.jwt){
  //     dispatch(addToken(requestData.jwt))
  //   }
  // },[requestData])
  return (
    <section>
      <h1>Connexion</h1>
      {/* <Form className="form-login" onSubmit={handleLogin} method="post">
        <FormGroup className="form-group">
          <Form.Label>Identifiant</Form.Label>
          <Form.Control type="text" required name="identifier" />
        </FormGroup>
        <FormGroup className="form-group">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" required name="password" />
        </FormGroup>
        <Button type="submit">Soumettre</Button>
      </Form> */}
    </section>
  );
}
