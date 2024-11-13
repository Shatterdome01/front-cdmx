'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; 
import { Post } from '../../../types/post';

export default function UpdatePostPage() {
  const params = useParams(); 
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<Post | null>(null);

  useEffect(() => {
    if (params.id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
        .then((res) => res.json())
        .then((data: Post) => {
          setTitle(data.title);
          setBody(data.body);
        })
        .catch((error) => {
          console.error('Error fetching post:', error);
        });
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedPost = {
      id: Number(params.id), 
      title,
      body,
      userId: 1,
    };

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(updatedPost),
      });

      if (!res.ok) {
        throw new Error('Failed to update post');
      }

      const data: Post = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error updating post:', error);
      alert('There was an error updating the post.');
    }
  };

  return (
    <div>
      <h1>Updating a resource {params.id}</h1>
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Update Post</button>
      </form>

      {response && (
        <div>
          <h2>Post Updated Successfully:</h2>
          <p><strong>ID:</strong> {response.id}</p>
          <p><strong>Title:</strong> {response.title}</p>
          <p><strong>Body:</strong> {response.body}</p>
        </div>
      )}
    </div>
  );
}