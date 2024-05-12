import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    <div>
      <h1>Noticias de la categoría {categoria}</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
          // Aquí puedes mostrar más detalles de cada noticia si lo deseas
        ))}
      </ul>
    </div>
  );
}

export default CategoriaPosts;
