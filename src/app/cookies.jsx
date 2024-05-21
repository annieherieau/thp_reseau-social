//https://www.npmjs.com/package/js-cookie
import Cookies from "js-cookie";
import toHomePage from "./toHomePage";

export const cookie_name = import.meta.env.VITE_COOKIE_NAME;

export function createCookie(token, username, userid) {
  Cookies.set(
    cookie_name,
    JSON.stringify({ token: token, username: username, userid: userid }),
    { expires: 7 }
  );
  toHomePage();
}

export function updateCookie(username) {
  
  const data = { ...loadCookie(), username: username };
  Cookies.set(cookie_name, JSON.stringify(data), { expires: 7 });
}

export function loadCookie() {
  return Cookies.get(cookie_name) ? JSON.parse(Cookies.get(cookie_name)) : null;
}

export function removeCookie() {
  Cookies.remove(cookie_name);
}
