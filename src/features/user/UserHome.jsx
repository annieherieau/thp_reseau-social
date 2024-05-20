import PostForm from "../posts/PostForm";
import PostList from "../posts/PostsList";

export default function UserHome(){
  return (
    <>
    <h2>Bonjour</h2>
    <PostForm/>
    <PostList authorId = {null}/>
    </>
  )
}