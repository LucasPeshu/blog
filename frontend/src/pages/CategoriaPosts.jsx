import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard'; 

function CategoriaPosts() {
  const { categoria } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/blog/posts/categoria/${categoria}/`)
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts by category:', error));
  }, [categoria]);

  return (
    <div className='container mx-auto px-6 sm:px-4 lg:px-40'>
      <h1 className='text-3xl sm:text-4xl lg:text-6xl text-left uppercase font-bold py-4'>{categoria}:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map(post => (
          <PostCard
            key={post.id}
            slug={post.slug}
            nombre={post.title}
            excerpt={post.excerpt}
            categoria={categoria} 
            imagen={`http://localhost:8000${post.thumbnail}`} 
          />
        ))}
      </div>
    </div>
  );
}

export default CategoriaPosts;
