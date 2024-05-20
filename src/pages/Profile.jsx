import PostList from "../features/posts/PostsList";
import UserProfile from "../features/user/UserProfile";

export default function Profile() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2MTk1MTM2LCJleHAiOjE3MTg3ODcxMzZ9.4uGdJ_Bn1m6V0D-Vam2z22DV0cOndo1-kBrK78LGTRU"
  const username = 'user1'
  const authorId = 1;
    return (
      <section>
        <h1>Profil {username}</h1>
        <UserProfile />
        <PostList authorId={authorId} />
      </section>
    );
}
