import { useState, useEffect } from "react";
import {
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import PropTypes from "prop-types";
import Comments from '../Comments/Comments';
import axios from "axios";

const Post = ({ username, userImg, content, imageSrc, initialLikes, postId, createdAt }) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    getLikesCount();
  }, []);

  const handleLike = async () => {
    try {
      if (!hasLiked) {
        const authToken = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };

        const response = await axios.post("/newLike", { postId }, config);
        setLikes(response.data.likes);

        setHasLiked(true);
      }
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  const getLikesCount = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.get(`/likesCount/${postId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setLikes(response.data.likesCount);
    } catch (error) {
      console.error("Error al obtener la cantidad de likes:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="flex justify-center my-6">
      <Card className="w-full md:w-2/3 lg:w-1/2 shadow-lg rounded-lg p-4 bg-white dark:bg-gray-900 transition duration-300 ease-in-out">
        <CardContent>
          <div className="flex items-center mb-4">
            <Avatar className="mr-3" alt={username} src={userImg} />
            <div>
              <Typography variant="subtitle1" component="div" className="font-semibold">
                {username}
              </Typography>
              <Typography variant="caption" color="textSecondary" component="div">
                {formatDate(createdAt)}
              </Typography>
            </div>
          </div>
          <Typography variant="body1" component="p" className="mb-4 text-gray-800 dark:text-gray-200">
            {content}
          </Typography>
          {imageSrc && (
            <div className="flex justify-center mb-4">
              <img
                src={imageSrc}
                alt="Post"
                className="w-full md:w-auto h-auto rounded-lg object-cover"
              />
            </div>
          )}
          <Comments postId={postId} />
        </CardContent>
        <CardActions className="flex justify-between">
          <IconButton
            aria-label="add to favorites"
            onClick={handleLike}
            disabled={hasLiked}
            className={`transition-colors duration-300 ${hasLiked ? "text-red-600" : "text-gray-600 dark:text-gray-400"}`}
          >
            <FavoriteIcon />
            <Typography variant="caption" className="ml-2">
              {likes}
            </Typography>
          </IconButton>
          <div className="flex gap-4">
            <IconButton aria-label="comment" className="text-gray-600 dark:text-gray-400 transition-colors duration-300 hover:text-blue-500">
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton aria-label="share" className="text-gray-600 dark:text-gray-400 transition-colors duration-300 hover:text-blue-500">
              <ShareIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

Post.propTypes = {
  username: PropTypes.string.isRequired,
  userImg: PropTypes.string,
  createdAt: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  imageSrc: PropTypes.string,
  initialLikes: PropTypes.number,
  postId: PropTypes.number.isRequired,
};

export default Post;