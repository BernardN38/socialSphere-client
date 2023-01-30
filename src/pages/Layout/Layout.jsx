import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"
const Layout = () => {
  const [userId, setUserId] = useState(null);
  if (userId === null) {
    const localUserId = localStorage.getItem('userId');
    if (localUserId){
      console.log("userId loaded from local storage", localUserId)
      setUserId(localUserId);
    }
  }
  return (
    <Box sx={{backgroundColor:"#fafafa", height:"100vh"}}>
      <Navbar userId={userId}/>
      <Outlet context={[userId, setUserId]}/>
    </Box>

  )
};

export default Layout;