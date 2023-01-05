import { useState, useRef } from 'react'
import axios from "axios";
import { serverUrl } from "../../config"


const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function PostLogic(imageId, postId, likesCount) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes,setLikes] = useState(likesCount);
  const [expanded, setExpanded] = useState(false);
  const [imgSrc, setImgSrc] = useState(`${serverUrl}/image/${imageId}`);
  const anchorRef = useRef(null);


  const convertDate = (timestamp) => {
    const time = new Date(timestamp)
    return `Date: ${month[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}`
  }

  const handleToggle = (event) => {
    setOpen((open) => !open);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  const initMenu = () => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }

  const deletePost = () => {
    axios.delete(`${serverUrl}/posts/${postId}`, { withCredentials: true }).then((resp) => { console.log(resp) }).catch((error) => { console.log(error) })
  };
  const handleLike = () => {
    isLiked ? deleteLike() : addLike();
  }

  const addLike = () => {
    axios.post(`${serverUrl}/posts/${postId}/likes`, null, { withCredentials: true }).then((resp) => {
      console.log(resp.data)
      setLikes(likes+1)
      setIsLiked(true)
    })
  }
  const deleteLike = () => {
    axios.delete(`${serverUrl}/posts/${postId}/likes`, { withCredentials: true }).then((resp) => {
      console.log(resp.data)
      setLikes(likes-1)
      setIsLiked(false)
    })
  }
  const checkLike = () => {
    axios.get(`${serverUrl}/posts/${postId}/likes/check`, { withCredentials: true }).then((resp) => {
      setIsLiked(resp.data)
    })
  }
  const getComments= () => {
    axios.get(`${serverUrl}/posts/${postId}/comments`, {withCredentials:true}).then((resp)=>{
      const respJson = JSON.parse(resp.data.data)
      setComments(respJson)
    })
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open)
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(!open)
  };
  return {  convertDate,  initMenu, handleToggle, handleClick, handleClose, handleCloseMenu, handleListKeyDown, anchorRef, anchorEl, open, setOpen,likes, deletePost, addLike, deleteLike, checkLike,getComments,comments, setComments, isLiked, handleLike, handleClick, handleClose, imgSrc, setImgSrc, setExpanded,expanded }
}

export default PostLogic;