import { Link } from "react-router-dom";

export default function DisplayAuthorLink({ authorData }) {
  return (
    authorData && (
      <Link to={`/author/${authorData.id}`}>
        {authorData.attributes.username}
      </Link>
    )
  );
}
