import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Avatar, Box, Button, Link, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UserHeaderLogic from './UserHeaderLogic';
import { serverUrl } from '../../config';

const linkStyles = {
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    },
}


function UserHeader({ username, userId }) {
    const { handleFriendRequest, getUserData, userData } = UserHeaderLogic(userId);
    const navigate = useNavigate();
    useEffect(() => {
        getUserData();
    }, [userId])
    return (
        <Card sx={{
            backgroundColor: "#f5f5f5", color: "black", height: "200px", marginTop: "10px",
            // position: "sticky", top: "60px", zIndex: 2
        }} variant="outlined">
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", height: "80%" }}>
                <Avatar sx={{ marginTop: "5px" }} src={`${serverUrl}/users/${userId}/profileImage`} />
                <Link style={linkStyles} onClick={() => { navigate(`/users/${userId}`) }}>{userData.Username}</Link>

            </Box>
            <Box sx={{ display: 'flex', justifyContent: "center" }}>
                <Button onClick={handleFriendRequest}>
                    Follow
                    <AddIcon />
                </Button>
            </Box>
        </Card>
    )
}

export default UserHeader;