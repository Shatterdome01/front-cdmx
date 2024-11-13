//import { Post } from '';
import { Post } from '@/app/types/post';
import React from 'react';

interface PostPageProps {
  params: { id: string };
}

export default async function PostPage({ params }: PostPageProps) {
  //const { id } = params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post: Post = await res.json();
  console.log(post)

  return (
    <div>
        <strong><h1>Getting a resource</h1></strong>
      <strong><h1>{post.title}</h1></strong>
      <br/>
      <p><strong>User ID:</strong> {post.userId}</p>
     
      <p>{post.body}</p>
     
    </div>
  );
}

// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then((response) => response.json())
//   .then((json) => console.log(json));