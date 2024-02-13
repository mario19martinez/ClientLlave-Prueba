// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    // Lógica para recuperar comentarios asociados a postId
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
        // Manejar el error de manera adecuada
      } else {
        setComments([...comments, response.data.comment]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);

      // Imprimir la respuesta del servidor en la consola
      console.log("Server response:", error.response);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  }

  return (
    <div className="">
      <h2 className="text-lx font-bold mb-4">Comments</h2>
      <div className="flex items-center mb-2">
        <button onClick={toggleComments} className="mr-2">
          {showComments ? "Ocultar" : "Ver Comentarios"}
        </button>
        <p className="text-gray-500 mb-0">
          {comments.length === 1
            ? "1 comment"
            : `${comments.length} comments`}
        </p>
      </div>
      {showComments && (
        <ul className="list-none p-0">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-4 border-b-2 border-gray-300 rounded-lg pb-2 bg-gray-100">
              {comment.user && (
                <p className="text-gray-800 font-gabarito translate-x-4">
                  By: {comment.user.name} {comment.user.last_name}
                </p>
              )}
              <p className="text-gray-800 translate-x-4">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border-2 border-blue-500 rounded"
        ></textarea>
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

Comments.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default Comments;
