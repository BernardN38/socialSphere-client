import React from 'react';
import { Card, CardHeader, Typography, CardContent, Avatar, Link } from "@mui/material";
import { serverUrl } from "../../config";
import { useNavigate } from 'react-router-dom';
// import { serverUrl } from '../../config';
// import {Link} from "react-router-dom";
const linkStyles = {
    textDecoration: 'none',
    cursor:'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  }

function Comment({ body, authorName, userId }) {
    const navigate = useNavigate();
    return (
        <Card sx={{marginTop:1}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ width: "30", height: "30" }} src={`${serverUrl}/users/${userId}/profileImage`} />
                }
                title={<Link style={linkStyles} onClick={()=>{navigate(`/users/${userId}`)}}>{authorName}</Link>}
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