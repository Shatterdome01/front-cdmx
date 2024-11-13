'use client';

import { Post } from '@/app/types/post';
import React, { useState } from 'react';
//import { Post } from 

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<Post | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
        title,
        body,
        userId: 1,
    }

    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newPost),
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <strong><h1>Creating a resource</h1></strong>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create post</button>
      </form>

      {response && (
        <div>
          <h2>Post Created:</h2>
          <p><strong>ID:</strong> {response.id}</p>
          <p><strong>Title:</strong> {response.title}</p>
          <p><strong>Body:</strong> {response.body}</p>
        </div>
      )}
    </div>
    
  );
}
