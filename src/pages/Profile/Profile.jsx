import { useState } from "react";
import { Box, Stack } from "@mui/material";
import AddPost from "../../components/AddPost/AddPost"
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/RightBar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserHeader from "../../components/UserHeader/UserHeader";


function Profile() {
  let { userId } = useParams();
  const [refresh, setRefresh] = useState(false);
  const { innerWidth: width, innerHeight: height } = window;

  return (
    <Box>
      {/* <UserHeader/> */}
      <Stack direction="row" justifyContent="space-between">
        {width > 500 ? <Sidebar userId={userId} /> : ""}
        
        <Feed userId={userId} refresh={refresh} />
        {width > 500 ? <Rightbar /> : ""}

      </Stack>
      <AddPost setRefresh={setRefresh} refresh={refresh} />
    </Box>
  );
}

export default Profile;
