import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import img from "../../assets/cardBlog.png";

const CardBlog = ({ blog }) => {
  const navigate = useNavigate();

  const handleViewBlog = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleCardClick = () => {
    handleViewBlog(blog.id);
  };

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]+>/g, "");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-lg mx-auto mb-8 transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer max-w-sm"
      onClick={handleCardClick}
    >
      <div className="relative aspect-w-16 aspect-h-9">
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-br-lg z-10">
          {blog.autor}
        </div>
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
        <div className="text-gray-600 line-clamp-3 mb-4">
          {stripHtmlTags(blog.content)}
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-500 text-sm">{formatDate(blog.createdAt)}</p>
        </div>
        <div className="flex space-x-10">
          <div className="flex justify-start space-x-2 items-center text-gray-500 text-sm mt-2">
            <p>Tiempo de lectura:</p>
            <span>{blog.Lectura}</span>
            <FaClock className="mr-1" />
          </div>
          <div className="flex justify-end mt-2">
            <p className="text-blue-500 text-sm">Click para leer más</p>
          </div>
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
    createdAt: PropTypes.string.isRequired,
    autor: PropTypes.string,
    Lectura: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardBlog;
