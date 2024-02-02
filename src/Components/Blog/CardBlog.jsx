// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CardBlog = ({ blog }) => {
  const navigate = useNavigate();

  const handleViewBlog = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleCardClick = () => {
    handleViewBlog(blog.id);
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md mx-auto mb-4 transform transition duration-300 hover:scale-105"
      onClick={handleCardClick} 
      style={{ cursor: 'pointer' }} 
    >
      {blog.imageUrl && (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={blog.imageUrl}
            alt="Imagen del blog"
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800 h-14 overflow-hidden">
          {blog.title}
        </div>
      </div>
    </div>
  );
};

CardBlog.propTypes = {
  blog: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardBlog;