'use client';

import { Post } from '@/app/types/post';
import React, { useState, useEffect } from 'react';


export default function FilterPostsPage() {
  const [response, setResponse] = useState<Post[]>([]);
  const [userId, setUserId] = useState('1'); 

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then((data) => setResponse(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, [userId]); 

  return (
    <div className="flex flex-col md:flex-grow">
      <h1 >Filter Posts by User</h1>
      <div>
        <label>Filter by User ID:</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <ul>
        {response.map((response) => (
          <li key={response.id}>
            <strong><h2>{response.title}</h2></strong>
            <p>{response.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

