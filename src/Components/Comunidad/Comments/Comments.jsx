import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";

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
    <div className="bg-white p-2 mt-6">
      <div className="flex items-center mb-4">
        <button
          onClick={toggleComments}
          className={` text-blue-500 py-0 px-0 transition duration-200 ${
            showComments ? "" : ""
          }`}
        >
          {showComments ? (
            <>
              <ModeCommentOutlinedIcon className="mr-2" />
            </>
          ) : (
            <>
              <InsertCommentOutlinedIcon className="mr-2" />
            </>
          )}
        </button>
        <p className="text-gray-500 ml-0">
          {comments.length === 1
            ? "1 comentario"
            : `${comments.length} comentarios`}
        </p>
      </div>
      {showComments && (
        <ul className="list-none p-0 max-h-64 overflow-y-auto">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="mb-4 p-4 border border-gray-300  rounded-lg bg-gray-50 "
            >
              {comment.user && (
                <p className="text-gray-800  font-semibold mb-2">
                  {comment.user.name} {comment.user.last_name}
                </p>
              )}
              <p className="text-gray-800 ">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Agrega un comentario..."
          className="w-full p-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
        ></textarea>
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700 transition duration-200"
        >
          <ModeCommentOutlinedIcon className="mr-2" />
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
