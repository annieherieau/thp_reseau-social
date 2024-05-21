// atoms
import {useAtomValue } from "jotai";
import { authAtom} from "../app/atoms";

// features
import PostList from "../features/posts/PostsList";
import Visitor from "../features/user/Visitor";
import PostForm from "../features/posts/PostForm";
import { useState } from "react";
import { buildRequest, handleResponse } from "../app/api";
import { useEffect } from "react";

export default function Home() {
  const isLoggedIn = useAtomValue(authAtom);
  const [newPost, setNewPost] = useState(undefined);
  const requestType = "create_post";
  const [request, setRequest] = useState(undefined);

  // soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    // récupérer les données du formulaire
    let formData = new FormData(event.target);
    let thisData = {};
    for (const [key, value] of formData.entries()) {
      thisData[key] = value;
    }
    thisData.author = isLoggedIn.userid;
    console.log(thisData);
    // créer la requête CREATE DU POST
    setRequest(
      buildRequest(requestType, {
        body: { data: thisData },
        token: isLoggedIn.token,
      })
    );
  };

  // // envoyer la requête CREATE
  useEffect(() => {
    if (request) {
      fetch(request.url, request.options)
        .then((response) => response.json())
        .then((response) => handleResponse(requestType, response))
        .catch((err) => console.error(err));
    }
  }, [request]);

  
  return (
    <section>
      <h1>Mini-Twitter</h1>
      {isLoggedIn && (<PostForm
        postText=""
        targetId={requestType}
        // onChange={() => setShowAlert(false)}
        onSubmit={handleSubmit}
      />)}
      {isLoggedIn ? <PostList /> : <Visitor />}
    </section>
  );
}
