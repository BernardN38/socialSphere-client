import React, { useEffect, useState, useRef } from 'react';
import { Badge, Box, Menu, MenuItem, Alert,AlertTitle, Stack } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useOutletContext } from "react-router-dom";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';


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
function Notification() {
    const [notifications, setNotifications] = useState([]);
    // const [userId, setUserId] = useOutletContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const webSocket = useRef(null);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8088/ws');
        webSocket.current = over(Sock);
        webSocket.current.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        webSocket.current.subscribe(`/user/${1}/notifications`, onMessage);
    }

    const onMessage = (payload) => {
        console.log(payload, notifications);
        const data = JSON.parse(payload.body);
        console.log(data)
        setNotifications((prevState) => {
            return [...prevState, data]
        });
    }

    const onError = (err) => {
        console.log(err, "aasdfs", "dafsdfsdfsdf");
    }
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        connect();
        return () => webSocket.current.disconnect();
    }, [])
    return (
        <Box>
            <Badge badgeContent={notifications.length} color="primary" onClick={handleMenu}>
                <NotificationsIcon color="" />
            </Badge>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Stack sx={{ width: '100%', margin:"0" }} spacing={0.25}>
                    {notifications.map((el, i) => {

                        return (

                            
                                <Alert severity={NotificationTypes[el.type].severity}>
                                    <AlertTitle>{NotificationTypes[el.type].title}</AlertTitle>
                                    {el.message}
                                </Alert>

                            
                        )
                    })}
               </Stack>
            </Menu>
        </Box>
    )
}

export default Notification;