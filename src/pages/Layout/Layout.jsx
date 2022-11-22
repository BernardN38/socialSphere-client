import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"
const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>

  )
};

export default Layout;