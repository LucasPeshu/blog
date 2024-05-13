import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';

function SearchResultsPage() {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch search results based on searchTerm
    fetch(`http://127.0.0.1:8000/blog/posts/search/${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data.filtered_posts))
      .catch((error) => console.error('Error fetching search results:', error));
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-6 sm:px-4 lg:px-40">
      <h1 className="text-3xl sm:text-4xl lg:text-6xl text-left uppercase font-bold py-4">
        Resultados de búsqueda para "{searchTerm}":
      </h1>
      <div className="pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {searchResults.map((post) => (
          <PostCard
            key={post.id}
            slug={post.slug}
            nombre={post.title}
            excerpt={post.excerpt}
            categoria={post.category}
            imagen={`http://localhost:8000${post.thumbnail}`}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResultsPage;
