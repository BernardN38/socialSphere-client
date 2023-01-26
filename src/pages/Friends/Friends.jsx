import React from 'react'
import { TextField, Box, Typography, Button, Stack, Collapse } from '@mui/material';
import FriendsLogic from './FriendsLogic';
import UserHeader from '../../components/UserHeader/UserHeader';
import { v4 as uuid } from 'uuid';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';



function Friends() {
    const { handleFindFriends, foundUsers, expanded, setExpanded } = FriendsLogic();
    return (
        <Box sx={{ p: 2 }}>
            <Collapse in={expanded}>
                <form onSubmit={handleFindFriends}>
                    <Stack spacing={0.75}>
                        <Typography sx={{ textAlign: "center" }}>Find Friends</Typography>
                        <TextField fullWidth size="small" label="First Name" name='firstName' />
                        <TextField fullWidth size="small" label="Last Name" name='lastName' />
                        <TextField fullWidth size="small" label="Username" name='username' />
                        <TextField fullWidth size="small" label="Email" name='email' />
                        <Button variant="contained" type='submit' fullWidth>Find</Button>
                    </Stack>
                </form>
            </Collapse>
            <Collapse in={!expanded}>
                <Box>
                    <Button variant="outlined" onClick={() => { setExpanded(!expanded) }} fullWidth>Find Friends
                        <ArrowDownwardIcon />
                    </Button>
                </Box>
            </Collapse>
            {foundUsers.map((el) => {
                return (
                    <div key={uuid()}>
                        <UserHeader username={el.Username} userId={el.UserID}/>
                    </div>
                )
            })}
        </Box>
    )
}

export default Friends