import React, { useEffect } from 'react'
import { Box, Typography, Stack, ButtonGroup, Button, IconButton } from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ProfileImageUploadFormLogic from './ProfileImageUploadFormLogic';



function ProfileImageUploadForm() {
    const { uploadProfileImage } = ProfileImageUploadFormLogic();
    return (

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} bgcolor="white" p={3} marginX={1} borderRadius={5}>
            <form onSubmit={uploadProfileImage}>
                <Typography variant="h6" color="gray" textAlign="center">
                    Upload Profile Image
                </Typography>
                <Stack direction="column" spacing={2}>

                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" name="image" />
                        <PhotoCameraIcon />
                    </IconButton>
                </Stack>
                <ButtonGroup fullWidth>
                    <Button type='submit'>Upload</Button>
                </ButtonGroup>
            </form>
        </Box>

    )
}

export default ProfileImageUploadForm;