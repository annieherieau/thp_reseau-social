import { Link } from "react-router-dom";
// atoms
import { useAtomValue } from "jotai";
import { authAtom } from "../../app/atoms";

export default function DisplayCardHeader({ authorData }) {
  const isLoggedIn = useAtomValue(authAtom);
  // lien si le user est l'auteur ou non
  const isMyPost = authorData && authorData.id === isLoggedIn.userid;
  const link = isMyPost ? '/profile/' : `/profile/${authorData.id}`
  
  return (
    authorData && (
      <Link to={link}>
        {authorData.attributes.username}
      </Link>
    )
  );
}
