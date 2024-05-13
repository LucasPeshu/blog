import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import LatestPostsByCategory from '../components/LatestPostsByCategory'
import SearchBar from '../components/SearchBar';
function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getCategoryName = (categoryId) => {
    const category = categories.find(category => category.id === categoryId);
    return category ? category.nombre : '';
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/blog/posts/?page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setPosts(data.results);
        setTotalPages(data.total_pages);
      })
      .catch(error => console.error('Error fetching posts:', error));

    fetch('http://127.0.0.1:8000/blog/categorias/')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, [currentPage]);

  return (
    <div className='container mx-auto px-6 sm:px-4 lg:px-40'>
      <SearchBar />
      <h1 className="text-3xl sm:text-4xl lg:text-6xl text-left uppercase font-bold pb-4">🔥 Últimas publicaciones:</h1>
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
      <div className="flex justify-center mb-6">
        <button
          className="bg-indigo-500 font-medium text-white px-4 py-2 rounded-lg mr-2"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          className="bg-indigo-500 font-medium text-white px-4 py-2 rounded-lg ml-2"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>

      <div className="pb-6">
        {categories.map(category => (
          <LatestPostsByCategory key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Home;
