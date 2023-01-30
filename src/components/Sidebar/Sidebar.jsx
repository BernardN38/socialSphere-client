import React from 'react';
import {useOutletContext } from "react-router-dom"
import { Box, List, ListItem, ListItemButton, ListItemText, Switch } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
function Sidebar() {
  
  const navigate = useNavigate();
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={()=>{navigate('/account')}}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" onClick={()=>{navigate('/friends')}}>
              <ListItemIcon>
                <PeopleIcon/>
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" >
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <ModeNightIcon />
              </ListItemIcon>
              <Switch />
            </ListItemButton>
          </ListItem> */}

        </List>
      </Box>
    </Box>
  )
}

export default Sidebar;