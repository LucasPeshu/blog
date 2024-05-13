import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';

function LatestPostsByCategory({ category }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/blog/posts/categoria/${category.nombre}/`)
      .then(response => response.json())
      .then(data => setPosts(data.slice(0, 4))) 
      .catch(error => console.error('Error fetching latest posts by category:', error));
  }, [category]);

  return (
    <div>
      <h2 className='text-3xl sm:text-4xl lg:text-6xl text-left uppercase font-bold py-4'>{category.nombre}</h2>
      <div className='pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {posts.map(post => (
          <PostCard
            key={post.id}
            slug={post.slug}
            nombre={post.title}
            excerpt={post.excerpt}
            imagen={`http://localhost:8000${post.thumbnail}`}
            categoria={category.nombre}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestPostsByCategory;
