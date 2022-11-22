import { useState } from "react";
import { Box, Stack } from "@mui/material";
import Add from "../../components/Add/Add"
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/RightBar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect } from "react";


function Profile() {
  const [refresh, setRefresh] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { innerWidth: width, innerHeight: height } = window;
  useEffect(() => {


  }, [])
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        {width > 500 ? <Sidebar /> : ""}
        <Feed refresh={refresh} />
        {width > 500 ? <Rightbar /> : ""}

      </Stack>
      <Add setRefresh={setRefresh} refresh={refresh} />
    </Box>
  );
}

export default Profile;
