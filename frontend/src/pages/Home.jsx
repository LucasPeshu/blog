import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Obtener las publicaciones
    fetch('http://127.0.0.1:8000/blog/posts/')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));

    // Obtener las categorías
    fetch('http://127.0.0.1:8000/blog/categorias/')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find(category => category.id === categoryId);
    return category ? category.nombre : '';
  };

  return (
    <div className='container mx-auto px-6 sm:px-4 lg:px-40'>
      <h1 className="text-3xl sm:text-4xl lg:text-6xl text-left uppercase font-bold py-4">🔥 Últimas publicaciones:</h1>
      <div className="pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map(post => (
          <PostCard
            key={post.id}
            slug={post.slug} 
            nombre={post.title}
            excerpt={post.excerpt}
            categoria={getCategoryName(post.categoria)}
            imagen={`http://localhost:8000${post.thumbnail}`} 
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

