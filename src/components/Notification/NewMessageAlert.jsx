import React from 'react';
import { v4 as uuid } from "uuid";
import { Badge, Box, Menu, MenuItem, Alert,AlertTitle, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const NotificationTypes = {
    "newMessage":{
        title:"New Message",
        severity:"info"
    },
    "newFollow":{
        title:"New Follow",
        severity:"success"
    }
}

function NewMessageAlert({ notification }) {
    const navigate = useNavigate();
    console.log(notification.payload)
    return (
        <Alert key={uuid()} onClick={()=>{navigate(`/chat/${notification.payload.fromUserId}`)}} severity={NotificationTypes[notification.type].severity}>
            <AlertTitle>{NotificationTypes[notification.type].title} {` from ${notification.fromUsername}`}</AlertTitle>
            Subject: {notification.payload.subject}
        </Alert>
    )
}

export default NewMessageAlert