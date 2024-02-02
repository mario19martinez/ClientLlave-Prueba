// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/allPost", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const updatedPosts = response.data.posts.map((post) => ({
          ...post,
          initialLikes: post.likes,
        }));
        setPosts(updatedPosts.reverse());
      })
      .catch((error) => {
        console.error("Error al obtener las publicaciones:", error);
      });
  }, [authToken]);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          username={`${post.user.name} ${post.user.last_name}`}
          userImg={post.user.image}
          date={post.date}
          content={post.content}
          imageSrc={post.image}
          initialLikes={post.initialLikes}
          postId={post.id}
        />
      ))}
    </div>
  );
};

export default PostsList;
