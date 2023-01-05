import React from 'react'
import { Tooltip, Modal, Box, Typography, styled, Avatar, TextField,  ButtonGroup, Button, } from "@mui/material";
import AddCommentLogic from "./AddCommentLogic";
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

function AddComment({comments,setComments, postId, username}) {
    const { open, setOpen, createComment } = AddCommentLogic(comments,setComments, postId);
    return (
        <>
            <Tooltip onClick={e => setOpen(true)} title="Delete" >
                <Button variant="contained" fullWidth>Write Comment</Button>
            </Tooltip>
            <StyledModal
                open={open}
                onClose={e => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={400} height={200} bgcolor="white" p={3} borderRadius={5}>
                    <form onSubmit={createComment}>
                        <Typography variant="h6" color="gray" textAlign="center">
                            Write Comment
                        </Typography>
                        <UserBox>
                        <Avatar sx={{ width: "30", height: "30" }} src={`${serverUrl}/users//profileImage`} />
                            <Typography>Username Placeholer</Typography>
                        </UserBox>
                        <TextField sx={{ width: "100%" }} multiline rows={3} placeholder="Whats on your mind" variant="standard" name="body" />
                        <ButtonGroup fullWidth>
                            <Button type='submit'>Post Comment</Button>
                        </ButtonGroup>
                    </form>
                </Box>
            </StyledModal>
        </>
    )
}

export default AddComment;