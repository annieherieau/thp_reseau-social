// atoms
import { useAtomValue } from "jotai";
import { authAtom } from "../../app/atoms";
import UserForm from "./UserForm";

export default function UserProfile({ user }) {
  const auth = useAtomValue(authAtom);
  const isMe = auth.userid === user.id;
  // requête
  const handleSubmit = (event)=>{

  }

  if (isMe) {
    return (
        <UserForm register={false} onSubmit={handleSubmit}/>
    );
  } else {
    return (
      <div className="user-infos">
        <p>{user.username}</p>
        <p>{user.description}</p>
      </div>
    );
  }
}
