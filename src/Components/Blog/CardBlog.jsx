// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import img from '../../assets/cardBlog.png'

const CardBlog = ({ blog }) => {
  const navigate = useNavigate();

  const handleViewBlog = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleCardClick = () => {
    handleViewBlog(blog.id);
  };

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]+>/g, '');
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-lg mx-auto mb-8 transform transition duration-300 hover:scale-105"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="aspect-w-16 aspect-h-9">
        {blog.imageUrl ? (
          <img
            className="object-cover object-center w-full h-full"
            src={blog.imageUrl}
            alt={blog.title}
          />
        ) : (
          <img
            className="object-cover object-center w-full h-full"
            src={img}
            alt={blog.title}
          />
        )}
      </div>
      <div className="px-6 py-4">
        <div className="font-semibold text-xl mb-2 text-gray-800 line-clamp-2">
          {blog.title}
        </div>
        <div className="text-gray-600 line-clamp-3">
          {stripHtmlTags(blog.content)}
        </div>
        <div className="flex justify-end mt-4">
          <p className="text-gray-600 text-sm">Click para leer más</p>
        </div>
      </div>
    </div>
  );
};

CardBlog.propTypes = {
  blog: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardBlog;