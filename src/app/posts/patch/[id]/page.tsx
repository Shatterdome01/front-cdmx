'use client';

import { Post } from '@/app/types/post';
import React, { useState } from 'react';

export default function PatchPostPage() {
  const [title, setTitle] = useState('');
  const [response, setResponse] = useState<Post | null>(null)
  console.log(response)

  const handlePatch = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title, 
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update post');
      }

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h1>Patching a resource</h1>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button onClick={handlePatch}>Update Title</button>

      {response && (
        <div>
          <h2>Post Updated Successfully:</h2>
          <p><strong>ID:</strong> {response.id}</p>
          <p><strong>Title:</strong> {response.title}</p>
          <p><strong>Body:</strong> {response.body}</p>
          <p><strong>UserID:</strong> {response.userId}</p>
        </div>
      )}
    </div>
  );
}
