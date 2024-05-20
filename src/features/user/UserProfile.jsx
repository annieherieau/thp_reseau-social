// atoms
import { useAtomValue } from "jotai";
import { authAtom } from "../../app/atoms";

export default function UserProfile() {
  const auth = useAtomValue(authAtom);
  // requête
  

  return (
    <div className="user-infos">
      <p>{auth.username}</p>
      <p>{auth.description}</p>
    </div>
  );
}
