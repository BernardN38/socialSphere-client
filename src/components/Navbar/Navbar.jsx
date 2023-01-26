import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Box, styled, Typography, InputBase, Badge, Avatar, Menu, MenuItem } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router-dom";
import NavbarLogic from './NavbarLogic';
import { serverUrl } from '../../config';

const SyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between"
})

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%"
}))

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex"
  }
}))

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none"
  }
}))



function Navbar({userId}) {
  const { navigate, handleClick, handleClose, setAnchorEl, anchorEl, open, getImage } = NavbarLogic();

  return (
    <AppBar position='sticky'>
      <SyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", ms: "block" } }}>SocialSphere</Typography>
        <PublicIcon sx={{ display: { xs: "block", ms: "none" } }} onClick={e => navigate("/")} />
        {/* <Search><InputBase placeholder='search...' /></Search> */}
        {/* <Icons>
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
          <Badge badgeContent={2} color="error">
            <NotificationsIcon />
          </Badge>
          <Avatar sx={{ width: "30", height: "30" }} src={`${serverUrl}/users/profileImage`} />
        </Icons> */}
        <UserBox onClick={handleClick}>
          <Avatar sx={{ width: "30", height: "30" }} src={`${serverUrl}/users//profileImage`} />
          <Typography variant='span'>John</Typography>
        </UserBox>
      </SyledToolbar>
      <Menu
        id="positioned-menu"
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={(e) => {
          navigate("/");
          setAnchorEl(null)
        }
        }>Profile</MenuItem>
        <MenuItem onClick={(e) => {
          navigate("/account");
          setAnchorEl(null)
        }}>My account</MenuItem>
        <MenuItem onClick={(e) => {
          navigate("/friends");
          setAnchorEl(null)
        }}>Friends</MenuItem>
        <MenuItem >Logout</MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar;