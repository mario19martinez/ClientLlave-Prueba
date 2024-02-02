// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogHome = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await axios.get("/blogs");
        const sortedBlogs = response.data.sort((a, b) => b.id - a.id);
        const latestBlogs = sortedBlogs.slice(0, 5);
        setBlogs(latestBlogs);
      } catch (error) {
        console.error("Hubo un error al obtener los blogs:", error);
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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const h1Styles = {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#012677',
    marginTop: '20px',
    marginBottom: '20px',
  };

  return (
    <div className="max-w-screen-xl mx-auto pt-5">
      <div>
        <h1 style={h1Styles}>Ultimos Blogs</h1>
      </div>
      <div className="blog-slider">
        <Slider {...settings}>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="w-80 h-96 max-w-md overflow-hidden rounded shadow-lg flex flex-col"
              onClick={() => handleViewBlog(blog.id)} // Manejador de evento onClick
              style={{ cursor: 'pointer' }} // Agrega un indicador visual de que es clickeable
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  className="w-full h-full object-cover object-center rounded-t-lg"
                  src={blog.imageUrl}
                  alt={blog.title}
                />
              </div>
              <div className="px-6 py-4 flex-grow">
                <div className="font-bold text-xl mb-2 h-14 overflow-hidden">
                  {blog.title}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BlogHome;