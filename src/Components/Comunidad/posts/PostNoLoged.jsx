// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import PropTypes from "prop-types";
import Comments from "../Comments/Comments";

const PostNoLoged = ({
  username,
  userImg,
  content,
  imageSrc,
  postId,
  createdAt,
}) => {
  const [hasLiked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const [shareClicked, setShareClicked] = useState(false);
  const navigate = useNavigate();

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCommentClick = () => {
    setCommentClicked(true);
    handleDialogOpen();
  };

  const handleShareClick = () => {
    setShareClicked(true);
    handleDialogOpen();
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString(undefined, options);
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
                {formatDate(createdAt)}  {/* Mostrar la fecha y la hora formateada */}
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
            onClick={handleDialogOpen}
            disabled={hasLiked}
            style={{ color: hasLiked ? "red" : "inherit" }}
          >
            <FavoriteIcon />
          </IconButton>
          <div className="flex gap-2">
            <IconButton aria-label="comment" onClick={handleCommentClick}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton aria-label="share" onClick={handleShareClick}>
              <ShareIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>

      {/* Diálogo emergente flotante */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Te damos la bienvenida a la comunidad</DialogTitle>
        <DialogContent>
          {commentClicked || shareClicked
            ? "Para poder interactuar en la comunidad, debe registrarse o iniciar sesión."
            : "Mensaje de otra interacción con la card."}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            color="primary"
          >
            Iniciar Sesión
          </Button>
          <Button
            onClick={() => navigate("/RegistroUser")}
            variant="contained"
            color="success"
          >
            Registrarse
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PostNoLoged.propTypes = {
  username: PropTypes.string.isRequired,
  userImg: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  imageSrc: PropTypes.string,
  initialLikes: PropTypes.number,
  postId: PropTypes.number.isRequired,
  createdAt: PropTypes.string,
};

export default PostNoLoged;