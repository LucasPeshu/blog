import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/blog/posts/${slug}/`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('Error fetching post details:', error));
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const formattedDate = new Date(post.published).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const renderContentWithLineBreaks = (content) => {
    // Divide el contenido por saltos de línea y crea un array de elementos <p> para cada línea
    const paragraphs = content.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ));
    return paragraphs;
  };

  return (
    <div className='container mx-auto px-6 sm:px-4 lg:px-40'>
      <img className='rounded-b-xl h-96 w-full object-cover' src={`http://localhost:8000${post.thumbnail}`} alt="" />
      <h2 className='text-3xl sm:text-4xl lg:text-6xl uppercase font-bold py-6'>{post.title}</h2>
      <div className='font-medium text-xl text-gray-800'>{formattedDate}</div>
      <div className='font-medium text-xl text-gray-800 py-6'>{post.excerpt}</div>
      <div className='font-medium text-xl text-gray-800 pb-6'>
        {renderContentWithLineBreaks(post.content)}
      </div>
    </div>
  );
}

export default PostDetailPage;
