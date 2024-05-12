import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PostCard({ slug, nombre, excerpt, imagen, categoria }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white rounded-xl shadow-md text-left ${isHovered ? 'transform scale-105 transition-transform duration-300 ease-in-out' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="">
        <div className="">
          <img className="h-48 w-full rounded-t-xl object-cover" src={imagen} alt="Imagen de la publicación" />
        </div>
        <div className="p-4">
          <div className='text-indigo-500 rounded-lg font-medium'>{categoria}</div>
          <Link to={`/posts/${slug}`} className="uppercase tracking-wide font-semibold text-xl line-clamp-2">{nombre}</Link>
          <p className="text-gray-500 font-normal line-clamp-3">{excerpt}</p>
        </div>
      </div>
    </div>
  );
}

export default PostCard;

