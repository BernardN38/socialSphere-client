import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardMedia, Typography, IconButton, CardContent, CardActions, Checkbox, Menu, MenuItem } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostLogic from "./PostLogic";
import UserAvatar from '../UserAvatar/UserAvatar';


function Post({ authorName, body, date, imageId, postId, deletePost }) {
  const { source, convertDate, initPost, initMenu, anchorRef, open, setOpen, checkLike, isLiked, handleLike } = PostLogic(imageId, postId);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open)
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(!open)
  };
  useEffect(() => {

    initPost();
    initMenu();
    checkLike();

  }, [postId])
  return (
    <Card sx={{ marginTop: 1 }}>
      <CardHeader
        avatar={
          <UserAvatar />
        }
        action={
          <IconButton aria-label="settings" ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={authorName}
        subheader={convertDate(date)}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => { deletePost(imageId, postId) }}>Delete</MenuItem>
      </Menu>
      {source ? <CardMedia
        src={source}
        component="img"
        height="200px"
        alt="None"
      /> : ""}
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <Checkbox icon={<FavoriteBorder />} checked={isLiked} checkedIcon={<Favorite sx={{ color: "red" }} />} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Post;