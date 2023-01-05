import React from 'react';
import { Card, CardHeader, Typography, CardContent, Avatar } from "@mui/material";
import { serverUrl } from "../../config";
import {Link} from "react-router-dom"
function Comment({ body, authorName, userId }) {
    console.log(body,authorName,userId)
    return (
        <Card sx={{marginTop:1}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ width: "30", height: "30" }} src={`${serverUrl}/users/${userId}/profileImage`} />
                }
                title={<Link to={`/users/${userId}`} underline="always">{authorName}</Link>}
            />
            <CardContent >
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
                    {body}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Comment