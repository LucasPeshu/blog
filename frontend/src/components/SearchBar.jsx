import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='py-6 flex justify-center'>
      <input
        className='px-6 rounded-l-xl font-normal'
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar..."
      />

      <Link to={`/search/${searchTerm}`}>
        <FaSearch className='bg-indigo-500 rounded-r-xl text-5xl p-4 text-white' />
      </Link>
    </div>
  );
}

export default SearchBar;
