import { IoHomeSharp } from "react-icons/io5";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/blog/categorias/')
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <header className="bg-indigo-500 text-white py-4 shadow-md">
      <div className="container mx-auto px-6 sm:px-4 lg:px-40">
        <nav className="flex justify-between items-center px-2">
          <Link to="/" className="text-xl font-bold"><IoHomeSharp /></Link>
          <ul className="flex space-x-4">
            {categorias.map(categoria => (
              <li key={categoria.id}>
                <Link to={`/posts/categoria/${categoria.nombre}`} className="hover:underline font-normal">{categoria.nombre}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
