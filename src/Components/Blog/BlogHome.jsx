// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        const publishedBlogs = sortedBlogs.filter(blog => blog.estado === "publicado" || !blog.estado);
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
    <div className="max-w-screen-xl mx-auto pt-5" style={{ width: "95%" }}>
      <h1 className="text-center text-3xl font-bold text-blue-900 my-8">
        Últimos Blogs
      </h1>
      <div className="blog-slider" style={{ maxWidth: "calc(100% - 5px)" }}>
        <Slider {...settings}>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="blog-card cursor-pointer rounded overflow-hidden shadow-lg"
              onClick={() => handleViewBlog(blog.id)}
            >
              <img
                className="w-full h-56 object-cover object-center"
                src={blog.imageUrl}
                alt={blog.title}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
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

export default BlogHome;