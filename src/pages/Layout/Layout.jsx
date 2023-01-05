import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"
const Layout = () => {
  return (
    <Box sx={{backgroundColor:"#fafafa", height:"100vh"}}>
      <Navbar />
      <Outlet />
    </Box>

  )
};

export default Layout;