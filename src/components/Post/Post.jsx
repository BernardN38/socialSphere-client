import React, { useEffect } from 'react'
import { Card, CardHeader, CardMedia, Typography, IconButton, CardContent, CardActions, Menu, MenuItem, Button, Collapse, Avatar, Badge } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostLogic from "./PostLogic";
import Comment from '../Comment/Comment';
import { v4 as uuid } from "uuid";
import AddComment from '../AddComment/AddComment';
import { serverUrl } from "../../config"

function Post({ authorName, body, date, imageId, postId, deletePost, userId, likeCount }) {
  console.count(postId)
  const { convertDate, initMenu, anchorRef, open,
    checkLike, isLiked, handleLike, getComments,
    comments, setComments, likes, handleClick,
    handleClose, anchorEl, imgSrc, setImgSrc,
    setExpanded, expanded } = PostLogic(imageId, postId, likeCount);
  useEffect(() => {
    initMenu();
    checkLike();
  }, [postId])
  return (
    <Card sx={{ marginTop: 1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: "35", height: "35" }} src={`${serverUrl}/users/${userId}/profileImage`} />
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
      {imageId ? <CardMedia
        src={imgSrc}
        onError={(e) => {
          console.log(e)
          const timer = setTimeout(() => {
            setImgSrc(`${serverUrl}/image/${imageId}?`)
          }, 1000);
          return () => clearTimeout(timer);
        }}
        component="img"
        height="200px"
        alt="None"
      /> : ""}
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <Button onClick={(e) => {
        if (!comments) {
          getComments();
        }
        setExpanded(!expanded)
      }} fullWidth>Comments...</Button>
      <CardActions disableSpacing>
        <IconButton onClick={handleLike}>
          <Badge badgeContent={likes} color="primary" >
            {isLiked ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorder />}
          </Badge>
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <AddComment comments={comments} setComments={setComments} postId={postId} />
          {comments ? comments.map(c => <Comment key={uuid()} authorName={c.AuthorName} userId={c.UserID} body={c.Body} />) : ''}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Post;