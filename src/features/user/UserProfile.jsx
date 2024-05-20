// atoms
import { useAtomValue } from "jotai";


export default function UserProfile(){
  const auth = useAtomValue(authAtom);
  

  return(
    <p>UserProfile</p>
  )
}