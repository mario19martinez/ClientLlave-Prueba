import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import img from "../../../assets/cardBlog.png";

const CardAdminBlogs = ({ imageUrl, title, blogId, estado }) => {
  const navigate = useNavigate();

  const handleViewBlog = (blogId) => {
    navigate(`/Editor/Blogs/VerBlog/${blogId}`);
  };

  const handleEditBlog = () => {
    navigate(`/Editor/Blogs/EditarBlog/${blogId}`);
  };

  const estadoColorClass = () => {
    switch (estado) {
      case "rechazado":
        return "text-red-500";
      case "borrador":
        return "text-yellow-500";
      case "publicado":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const estadoText = estado ? estado : "Estado no definido";

  const truncatedTitle = title.length > 25 ? title.substring(0, 25) + "..." : title;

  return (
    <div className="border bg-gray-100 rounded-lg p-4 m-2 flex items-center hover:shadow-lg transition duration-300">
      <img
        src={imageUrl || img}
        alt="Blog"
        className="w-24 h-24 object-cover mr-4"
      />
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{truncatedTitle}</h3>
        <div>
        <p className={`font-semibold ${estadoColorClass()}`}>{estadoText}</p>
        </div>
        <div className="flex mt-2 space-x-2 items-center justify-center">
          <button
            className="text-blue-500 px-3 py-1 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            onClick={() => handleViewBlog(blogId)}
          >
            <VisibilityIcon />
          </button>
          <button
            className="text-green-500 px-3 py-1 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            onClick={handleEditBlog}
          >
            <EditIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

CardAdminBlogs.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  blogId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  estado: PropTypes.string.isRequired,
};

export default CardAdminBlogs;