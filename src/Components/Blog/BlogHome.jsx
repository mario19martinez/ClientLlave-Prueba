// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const BlogHome = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await axios.get("/blogs");
        const sortedBlogs = response.data.sort((a, b) => b.id - a.id);
        const publishedBlogs = sortedBlogs.filter(
          (blog) => blog.estado === "publicado" || !blog.estado
        );
        const latestBlogs = publishedBlogs.slice(0, 5);
        setBlogs(latestBlogs);
      } catch (error) {
        console.error("Hubo un error al obtener los blogs:", error);
        setError(
          "Hubo un error al cargar los blogs. Por favor, inténtalo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  const handleViewBlog = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    variableWidth: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-screen-xl mx-auto pt-5 px-4">
      <h1 className="text-center text-3xl font-bold text-blue-900 my-8">
        Últimos Blogs
      </h1>
      <div className="relative">
        <Slider {...settings}>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="blog-card cursor-pointer rounded-lg overflow-hidden shadow-lg mx-2 transition-transform transform hover:scale-105"
              onClick={() => handleViewBlog(blog.id)}
            >
              <img
                className="w-full h-56 object-cover object-center"
                src={blog.imageUrl}
                alt={blog.title}
              />
              <div className="p-4 bg-white">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                  {blog.title.length > 24
                    ? blog.title.slice(0, 24) + "..."
                    : blog.title}
                </h2>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-blue-500 bg-opacity-75 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition duration-300 z-10"
      onClick={onClick}
    >
      <ArrowForwardIosIcon className="h-6 w-6" />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-blue-500 bg-opacity-75 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition duration-300 z-10"
      onClick={onClick}
    >
      <ArrowBackIosNewIcon className="h-6 w-6" />
    </div>
  );
};

// Validación de PropTypes
NextArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

PrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

BlogHome.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      imageUrl: PropTypes.string,
      title: PropTypes.string.isRequired,
      estado: PropTypes.string,
    })
  ),
};

export default BlogHome;