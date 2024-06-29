import { useState, useEffect } from "react";
import {
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Typography,
  Modal,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PropTypes from "prop-types";
import Comments from '../Comments/Comments';
import axios from "axios";

const Post = ({ username, userImg, content, imageSrc, initialLikes, postId, createdAt }) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [lastLiker, setLastLiker] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [likers, setLikers] = useState([]);

  useEffect(() => {
    getLikesCount();
    checkIfUserLiked();
  }, []);

  const handleLike = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      await axios.post("/toggleLike", { postId }, config);
      getLikesCount();
      setHasLiked(!hasLiked);
    } catch (error) {
      console.error("Error al gestionar el like:", error);
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
      setLastLiker(response.data.lastLiker);
      setLikers(response.data.likers || []);
    } catch (error) {
      console.error("Error al obtener la cantidad de likes:", error);
    }
  };

  const checkIfUserLiked = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.get(`/userLikesPost/${postId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setHasLiked(response.data.hasLiked);
    } catch (error) {
      console.error("Error al verificar si el usuario ha dado like:", error);
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

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="flex justify-center my-6">
      <Card className="w-full md:w-2/3 lg:w-1/2 shadow-lg rounded-lg p-6 bg-white transition duration-300 ease-in-out transform hover:shadow-xl">
        <CardContent>
          <div className="flex items-center mb-4">
            <Avatar className="mr-3" alt={username} src={userImg} />
            <div>
              <Typography variant="subtitle1" component="div" className="font-semibold text-gray-900">
                {username}
              </Typography>
              <Typography variant="caption" color="textSecondary" component="div">
                {formatDate(createdAt)}
              </Typography>
            </div>
          </div>
          <Typography variant="body1" component="p" className="mb-4 text-gray-800 leading-relaxed">
            {content}
          </Typography>
          {imageSrc && (
            <div className="flex justify-center mb-4">
              <img
                src={imageSrc}
                alt="Post"
                className="w-full md:w-auto h-auto rounded-lg object-cover shadow-md"
              />
            </div>
          )}
        </CardContent>
        <CardActions className="flex justify-between">
          <IconButton
            aria-label="add to favorites"
            onClick={handleLike}
            className={`transition-colors duration-300 transform hover:scale-125 ${hasLiked ? "text-red-600" : "text-gray-600"}`}
          >
            <FavoriteIcon />
            <Typography variant="caption" className="ml-2">
              {likes}
            </Typography>
          </IconButton>
          <Typography variant="body2" component="div" className="ml-2 cursor-pointer hover:underline" onClick={handleOpenModal}>
            {lastLiker ? `${lastLiker} y otras ${likes - 1} personas les gusta esto` : `${likes} personas les gusta esto`}
          </Typography>
          <IconButton aria-label="comment" className="text-gray-600 transition-colors duration-300 hover:text-blue-500">
            <ChatBubbleOutlineIcon />
          </IconButton>
        </CardActions>
        <Comments postId={postId} />
      </Card>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/3">
          <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-4 text-gray-900">
            Personas a las que les gusta esto
          </Typography>
          <List>
            {likers.map((liker) => (
              <ListItem key={liker.sub} className="hover:bg-gray-100 rounded-lg">
                <ListItemAvatar>
                  <Avatar src={liker.image} alt={liker.name} />
                </ListItemAvatar>
                <ListItemText primary={liker.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </div>
  );
};

Post.propTypes = {
  username: PropTypes.string.isRequired,
  userImg: PropTypes.string,
  createdAt: PropTypes.string,
  content: PropTypes.string,
  imageSrc: PropTypes.string,
  initialLikes: PropTypes.number,
  postId: PropTypes.number.isRequired,
};

export default Post;