import React from 'react'
import { Card, Avatar, Box, Button } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import UserHeaderLogic from './UserHeaderLogic';

function UserHeader({ username, userId }) {
    const { handleFriendRequest } = UserHeaderLogic(userId);
    return (
        <Card sx={{
            backgroundColor: "#f5f5f5", color: "black", height: "200px", marginTop: "10px", display: "flex", justifyContent: "center",
            // position: "sticky", top: "60px", zIndex: 2
        }} variant="outlined">
            <Box>
                <Avatar sx={{ marginTop: "5px" }} />
                {username}
                <Button onClick={handleFriendRequest} >
                    Request
                    <NearMeIcon />
                </Button>
            </Box>

        </Card>
    )
}

export default UserHeader;