import React from 'react'
import { Tooltip, Fab, Modal, Box, Typography, styled, Avatar, TextField, Stack, ButtonGroup, Button, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddPostLogic from "./AddPostLogic";
import { serverUrl } from '../../config';

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px"
})
const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
})

function AddPost({setRefresh, refresh, userId}) {
    const { open, setOpen, createPost } = AddPostLogic(setRefresh, refresh);
    return (
        <>
            <Tooltip onClick={e => setOpen(true)} title="Delete" sx={{ position: "fixed", bottom: 20, left: { xs: "calc(50% - 25px)", md: 30 } }}>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Tooltip>
            <StyledModal
                open={open}
                onClose={e => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={400} height={280} bgcolor="white" p={3} borderRadius={5}>
                    <form onSubmit={createPost}>
                    {/* <form onSubmit={handleCompressedUpload}> */}
                        <Typography variant="h6" color="gray" textAlign="center">
                            Create Post
                        </Typography>
                        <UserBox>
                        <Avatar sx={{ width: "30", height: "30" }} src={`${serverUrl}/users//profileImage`} />
                            <Typography> John Doe</Typography>
                        </UserBox>
                        <TextField sx={{ width: "100%" }} multiline rows={3} placeholder="Whats on your mind" variant="standard" name="body" />
                        <Stack direction="row" mt={2} mb={3}>
                            <IconButton><EmojiEmotions color="primary" /></IconButton>
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/jpeg,image/png" type="file" name="image" />
                                <PhotoCameraIcon />
                            </IconButton>
                        </Stack>
                        <ButtonGroup fullWidth>
                            <Button type='submit'>Post</Button>
                            <Button sx={{ width: "100px" }}><DateRangeIcon /></Button>
                        </ButtonGroup>
                    </form>
                </Box>
            </StyledModal>
        </>
    )
}

export default AddPost;