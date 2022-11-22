import { useState, useRef } from 'react'
import axios from "axios";
import { serverUrl } from "../../config"

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function PostLogic(imageId, postId) {
  const [source, setSource] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const anchorRef = useRef(null);


  const convertDate = (timestamp) => {
    const time = new Date(timestamp)
    return `Date: ${month[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}`
  }

  const initPost = () => {
    if (imageId) {
        getImage();
    }
  }

  const getImage = () => {
    axios.get(`${serverUrl}/image/${imageId}`, { withCredentials: true, responseType: "blob" }).then((resp) => {
      setSource(URL.createObjectURL(resp.data))
    }).catch((error) => {
      if (error.response.status === 404) {
      }
    })
  }
  const handleToggle = (event) => {
    setOpen((open) => !open);
  };

  const handleClose = (event) => {
    anchorRef.current = event.target
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    };
    setOpen(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open)
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
    axios.post(`${serverUrl}/posts/${postId}/likes`, {}, { withCredentials: true }).then((resp) => {
      console.log(resp.data)
      setIsLiked(true)
    })
  }
  const deleteLike = () => {
    axios.delete(`${serverUrl}/posts/${postId}/likes`, { withCredentials: true }).then((resp) => {
      console.log(resp.data)
      setIsLiked(false)
    })
  }
  const checkLike = () => {
    axios.get(`${serverUrl}/posts/${postId}/likes/check`, { withCredentials: true }).then((resp) => {
      setIsLiked(resp.data)
    })
  }

  return { source, convertDate, initPost, initMenu, handleToggle, handleClick, handleClose, handleCloseMenu, handleListKeyDown, anchorRef, anchorEl, open, setOpen, deletePost, addLike, deleteLike, checkLike, isLiked, handleLike }
}

export default PostLogic;