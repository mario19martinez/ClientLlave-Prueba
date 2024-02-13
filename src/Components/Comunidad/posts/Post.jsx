// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
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
import Comments from '../Comments/Comments'
import axios from "axios";

const Post = ({ username, userImg, date, content, imageSrc, initialLikes, postId }) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    // Obtener la cantidad de likes al montar el componente
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

        // Cambiar el estado del like del usuario
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

  return (
    <div className="flex justify-center">
      <Card className="m-4 p-4 shadow-lg md:w-1/2">
        <CardContent className="flex flex-col">
          <div className="flex items-center mb-3">
            <Avatar className="mr-2" alt={username} src={userImg} />
            <div>
              <Typography variant="subtitle1" component="div">
                {username}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                component="div"
              >
                {date}
              </Typography>
            </div>
          </div>
          <div>
            <Typography variant="body1" component="p" className="mb-3">
              {content || ""}
            </Typography>
            {imageSrc && (
              <div className="flex justify-center">
                <img
                  src={imageSrc}
                  alt="Post"
                  className="w-full md:w-auto h-auto mb-3 rounded-lg"
                />
              </div>
            )}
          </div>
          <Comments postId={postId} />
        </CardContent>
        <CardActions className="flex justify-between items-center">
          <IconButton
            aria-label="add to favorites"
            onClick={handleLike}
            disabled={hasLiked}
            style={{ color: hasLiked ? "red" : "inherit" }}
          >
            <FavoriteIcon />
            <Typography variant="caption" className="ml-2">
              {likes}
            </Typography>
          </IconButton>
          <div className="flex gap-2">
            <IconButton aria-label="comment">
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton aria-label="share">
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
  date: PropTypes.string,
  content: PropTypes.string,
  imageSrc: PropTypes.string,
  initialLikes: PropTypes.number,
  postId: PropTypes.number.isRequired,
};

export default Post;
