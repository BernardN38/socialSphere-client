import { Box, TextField, Button, IconButton, Card, CardContent, Typography, CardActions } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuid } from 'uuid';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import MessagesHeader from './MessagesHeader';
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from '../../config';
import { useOutletContext } from "react-router-dom";

const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;



function Messages() {
    let { userId } = useParams();
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [fromUser, setFromUser] = useState({});
    const client = useRef(null);
    const targetEl = useRef(null);
    const [selfUserId] = useOutletContext();
    disableBodyScroll(targetEl)
    const connect = () => {
        const ws = new W3CWebSocket('ws://192.168.0.17:8081/messaging');
        client.current = ws
        client.current.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.current.onclose = () => {
            console.log("Websocket Client Closed")
        }
        client.current.onmessage = (event) => {
            // console.log(event)
            const jsonData = JSON.parse(event.data)
            setMessages((messages) => {
                return [jsonData, ...messages]
            })
        };
    }

    function handleInputChange(e) {
        setCurrentMessage(e.currentTarget.value)
    }

    function sendWsMessage(e) {
        e.preventDefault()
        const json = JSON.stringify({ message: currentMessage, toUserId: new Number(userId), subject: "test" })
        console.log(json)
        client.current.send(json)
        setCurrentMessage("");
        let date = new Date();
        setMessages((messages) => { return [{ message: currentMessage, toUserId: userId, time: `${date.getHours()}:${date.getMinutes()}` }, ...messages] })
    }
    useEffect(() => {
        connect();
        axios.get(`${serverUrl}/users/${userId}`, { withCredentials: true }).then((resp) => {
            setFromUser(resp.data);
        })
        
    }, [])
    return (
        <Box sx={{ height: "100%", padding: "5px", overflow: "hidden" }} ref={targetEl}>
            <MessagesHeader fromUser={fromUser} />
            <Box sx={{ height: "90%", padding: "5px" }}>
                <Box sx={{
                    height: "80%", overflow: "scroll", display: "flex",
                    flexDirection: "column-reverse"
                }}>
                    {messages.map((el, i) => {
                        let key = uuid();
                        return (
                            selfUserId == el.toUserId ? (<LeftMessage key={key} message={el} />) : (<RightMessage key={key} message={el} />)
                        )
                    })}
                </Box>
            </Box>
            <Box sx={{ position: "fixed", bottom: "20px", display:"flex", width:"100%" }}>
                <TextField value={currentMessage} onChange={handleInputChange} placeholder={"send message..."} sx={{ width: "85%", marginLeft: "" }} />
                <IconButton onClick={sendWsMessage}>
                    <SendIcon fontSize='large' color='primary' />
                </IconButton>
            </Box>
        </Box >
    )
}


function RightMessage({ message }) {
    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "4px", }}>
            <Card sx={{ minWidth: 210, backgroundColor: "#2196f3", }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>

                    <Typography variant="body2">
                        {message.userId}
                        {message.message}

                    </Typography>
                    <Typography>
                        {message.time}
                    </Typography>
                </CardContent>
                {/* <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions> */}
            </Card>
        </Box>
    )
}

function LeftMessage({ message }) {
    return (
        <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: "4px" }}>
            <Card sx={{ minWidth: 210, backgroundColor: "#1de9b6" }}>
                <CardContent>

                    <Typography variant="body2">
                        @{message.fromUsername}
                        <br />
                        {message.message}
                    </Typography>
                </CardContent>
                {/* <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions> */}
            </Card>
        </Box>
    )
}
export default Messages