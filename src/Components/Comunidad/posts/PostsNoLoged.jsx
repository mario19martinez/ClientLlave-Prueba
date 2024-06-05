import { useState, useEffect } from "react";
import PostNoLoged from "./PostNoLoged";
import axios from "axios";

const PostsNoLoged = () => {
  const [posts, setPosts] = useState([]);
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/allPost")
      .then((response) => {
        const updatedPosts = response.data.posts.map((post) => ({
          ...post,
          initialLikes: post.likes,
          // Si `createdAt` es una cadena de fecha válida, se mantendrá, de lo contrario, se establecerá en una fecha predeterminada
          createdAt: post.createdAt ? new Date(post.createdAt) : new Date("2024-02-02T00:00:00"),
        }));
        // Ordena los posts por fecha de creación, de la más reciente a la más antigua
        updatedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error("Error al obtener las publicaciones:", error);
      });
  }, [authToken]);

  return (
    <div>
      {posts.map((post) => (
        <PostNoLoged
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

export default PostsNoLoged;