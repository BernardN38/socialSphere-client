import React from 'react'
import { TextField, Box, Typography, Button } from '@mui/material';
import FriendsLogic from './FriendsLogic';
function Friends() {
    const { handleFindFriends } = FriendsLogic();
    return (
        <Box sx={{ p: 2 }}>
            <form onSubmit={handleFindFriends}>
                <Typography sx={{ textAlign: "center" }}>Find Friends</Typography>
                <TextField fullWidth label="First Name" name='firstName' />
                <TextField fullWidth label="Last Name" name='lastName' />
                <Button variant="contained" type='submit' fullWidth>Find</Button>
            </form>
        </Box>
    )
}

export default Friends