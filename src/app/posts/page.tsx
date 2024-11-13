import { Post } from '../types/post'; 

export default async function PostsPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await res.json();

  return (
    <div>
      <b><h1>Listing all resources</h1></b>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong><p>{post.id}</p></strong>
            <b><h1>{post.title}</h1></b>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
