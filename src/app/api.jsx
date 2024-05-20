import { useEffect } from "react";
import { useState } from "react";
import { createCookie} from "./cookies";

const api_url = import.meta.env.VITE_STRAPI_URL;

// Requestes, methodes et liens correspondants
const endpoints = {
  register: {
    method: "POST",
    url: api_url + "auth/local/register",
  },
  login: {
    method: "POST",
    url: api_url + "auth/local",
  },
  posts: { method: "GET", url: api_url + "posts" },
  create_post: { method: "POST", url: api_url + "posts" },
  read_post: { method: "GET", url: api_url + `posts/{:id}` },
  update_post: { method: "PUT", url: api_url + `posts/{:id}` },
  delete_post: {
    method: "DELETE",
    url: api_url + `posts/{:id}`,
  },
  populate_author: {
    method: "GET",
    url: api_url + `posts/{:id}?populate=author`,
  },
  posts_author: {
    method: "GET",
    url: api_url + `posts/?filters[author][id][$eq]={:id}`,
  },
  populate_users_likes: {
    method: "GET",
    url: api_url + `posts/{:id}?populate=users_likes`,
  },
  users: { method: "GET", url: api_url + "users" },
  read_user: { method: "GET", url: api_url + `users/{:id}` },
  read_user_me: { method: "GET", url: api_url + "users/me" },
  update_user_me: {
    method: "PUT",
    url: api_url + "users-permissions/users/me",
  },
};

// création de la requête: options et url
export function buildRequest(
  request = "posts",
  data = { id: null, body: null, token: null }
) {
  const { id, body, token } = data;
  const { method, url } = endpoints[request];
  const requestUrl = id ? url.replace("{:id}", id) : url;

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return { url: requestUrl, options: options };
}

// Envoi de la requete
export default function sendRequest(
  request = "posts",
  data = { id: null, body: null, token: null }
) {
  const { url, options } = buildRequest(request, data);

  const [resquestData, setResquestData] = useState(undefined);
  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => setResquestData(handleResponse(request, response)))
      .catch((err) => console.error(err));
  }, []);
  return resquestData;
}

// gestion de la réponse et création du cookie
export function handleResponse(request, response) {
  if ((request === "login" || request === "register") && response.jwt) {
    // création du cookie
    createCookie(response.jwt, response.user.username, response.user.id);
  }
  return response;
}
