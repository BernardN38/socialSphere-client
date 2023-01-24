import React from 'react'
import { Card, Avatar, Box } from '@mui/material';

function UserHeader() {
    return (
        <Card sx={{
            backgroundColor: "#f5f5f5", color: "white", height: "200px",  marginTop: "10px", display: "flex", justifyContent: "center",
            // position: "sticky", top: "60px", zIndex: 2
        }} variant="outlined">
            <Box>
                <Avatar sx={{marginTop:"5px"}}/>
            </Box>

        </Card>
    )
}

export default UserHeader