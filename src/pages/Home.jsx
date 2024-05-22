// atoms
import { useAtomValue } from "jotai";
import { authAtom } from "../app/atoms";

// features
import PostList from "../features/posts/PostsList";
import Visitor from "../features/user/Visitor";
import PostForm from "../features/posts/PostForm";
import { useState } from "react";
import { buildRequest } from "../app/api";
import toHomePage from "../app/toHomePage";

export default function Home() {
  const isLoggedIn = useAtomValue(authAtom);
  const [newPost, setNewPost] = useState(undefined);
  const requestType = "create_post";

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
    const request = buildRequest(requestType, {
      body: { data: thisData },
      token: isLoggedIn.token,
    });
    if (request) {
      fetch(request.url, request.options)
        .then((response) => response.json())
        .then((response) => setNewPost(response))
        .catch((err) => console.error(err));
    }
    location.reload();
  };


  // DELETE POST
  function deletePost(event) {
    // créer la requête UPDATE DU POST
    const request = buildRequest("delete_post", {
      id: event.target.id,
      token: isLoggedIn.token,
      body: null,
    });
    if (request) {
      fetch(request.url, request.options)
        .then((response) => response.json())
        .then((response) => setDeleteRequest(response))
        .catch((err) => console.error(err));
    }
    location.reload();
  }

  return (
    <section>
      <h1>Mini-Twitter</h1>
      {isLoggedIn && (
        <PostForm
          postText=""
          targetId={requestType}
          // onChange={() => setShowAlert(false)}
          onSubmit={handleSubmit}
        />
      )}
      {isLoggedIn ? <PostList onDelete={deletePost} /> : <Visitor />}
    </section>
  );
}
