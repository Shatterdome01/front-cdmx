'use client';

import React, { useState } from 'react';

export default function DeletePostPage() {
  const [response, setResponse] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',
      });

      if (res.ok) {
        setResponse('Post deleted successfully.');
      } else {
        throw new Error('Failed to delete post.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setResponse('Error deleting post.');
    }
  };

  return (
    <div>
        <h1>Deleting a resource</h1>
      <button onClick={handleDelete}>Delete Post</button>

      {response && <p>{response}</p>}
    </div>
  );
}
