import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        const response = await axios.get(`/comments/${postId}`, config);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.post(
        "/newComment",
        { postId, content: newComment },
        config
      );

      if (response.data && response.data.error) {
        console.error("Server error:", response.data.error);
      } else {
        setComments([...comments, response.data.comment]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      console.log("Server response:", error.response);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-200">Comentarios</h2>
      <div className="flex items-center mb-4">
        <button
          onClick={toggleComments}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          {showComments ? "Ocultar" : "Ver Comentarios"}
        </button>
        <p className="text-gray-500 ml-4">
          {comments.length === 1 ? "1 comentario" : `${comments.length} comentarios`}
        </p>
      </div>
      {showComments && (
        <ul className="list-none p-0 max-h-64 overflow-y-auto">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-4 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
              {comment.user && (
                <p className="text-gray-800 dark:text-gray-300 font-semibold mb-2">
                  {comment.user.name} {comment.user.last_name}
                </p>
              )}
              <p className="text-gray-800 dark:text-gray-300">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Agrega un comentario..."
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
        ></textarea>
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700 transition duration-200"
        >
          Comentar
        </button>
      </div>
    </div>
  );
};

Comments.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default Comments;