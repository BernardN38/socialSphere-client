import React, { useEffect, useState, useRef } from 'react';
import { Badge, Box, Menu, MenuItem, Alert, AlertTitle, Stack } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { v4 as uuid } from "uuid"
import NewMessageAlert from './NewMessageAlert';


function Notification({ userId }) {
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const webSocket = useRef(null);

    const connect = () => {
        let Sock = new SockJS('http://192.168.0.17:8088/ws');
        webSocket.current = over(Sock);
        webSocket.current.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        console.log(userId)
        webSocket.current.subscribe(`/user/${userId}/notifications`, onMessage);
    }

    const onMessage = (payload) => {
        const data = JSON.parse(payload.body);
        console.log(data)
        setNotifications((prevState) => {
            return [...prevState, data]
        });
    }

    const onError = (err) => {
        console.log(err);
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
               {notifications.length > 0 ?  <NotificationsIcon color="" /> : <NotificationsNoneIcon/>}
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
                <Stack sx={{ width: '100%', margin: "0" }} spacing={0.25}>
                    {notifications.map((el, i) => {
                        return (
                            <NewMessageAlert key={uuid()} notification={el} />
                        )
                    })}
                </Stack>
            </Menu>
        </Box>
    )
}

export default Notification;