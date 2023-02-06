import React, { useState, useRef, useEffect } from 'react'
import { Box, Button, Typography, Avatar, AvatarGroup, ImageList, ImageListItem, List, ListItem, ListItemText, Divider, Collapse, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { v4 as uuid } from 'uuid';
import { serverUrl } from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




function Rightbar() {
  const [messages, setMessges] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [images, setImages] = useState([]);
  const client = useRef(null);

  const navigate = useNavigate();


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
      console.log(jsonData)
      setMessges({ ...messages, [jsonData.fromUsername]: { from: jsonData.fromUserId, subject: jsonData.subject, message: jsonData.message } })
    };
  }


  function sendWsMessage(e, toId) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const json = JSON.stringify({ message: form.get("message"), toUserId: new Number(form.get("toUserId")) || new Number(toId), subject: form.get("subject") })
    console.log(json)
    client.current.send(json)
  }
  useEffect(() => {
    connect();
    axios.get("http://192.168.0.17:8085/friends/latestUploads", { withCredentials: true }).then((resp) => {
      console.log(resp.data)
      setImages(resp.data)
    })

  }, [])
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" }, marginRight: "5%" }}>
      <Box position="fixed" width={"30%"} mt={2}>
        <Typography variant="h6" fontWeight={100}>
          Online friends
        </Typography>
        <AvatarGroup max={4}>
          <Avatar alt="Remy Sharp" src={`${serverUrl}/users/${1}/profileImage`} />
          <Avatar alt="Travis Howard" src={`${serverUrl}/users/${1}/profileImage`} />
          <Avatar alt="Cindy Baker" src={`${serverUrl}/users/${1}/profileImage`} />
          <Avatar alt="Agnes Walker" src={`${serverUrl}/users/${1}/profileImage`} />
          <Avatar alt="Trevor Henderson" src={`${serverUrl}/users/${1}/profileImage`} />
        </AvatarGroup>
        <Typography variant="h6" fontWeight={100}>
          Latest Photos From Your Follows
        </Typography>
        <ImageList cols={3} rowHeight={150}>
          {images.length > 0 ? (
            images.map((el, i) => {
              return (
              <ImageListItem key={uuid()} onClick={()=>{navigate(`/users/${el.FriendB}`)}}>
                <img src={`${serverUrl}/image/${el.LastImageID}`} onError={()=>{setImages(images.filter((img,i)=>{return img.LastImageID != el.LastImageID  }))}} />
              </ImageListItem>)
            })
          )
            : ""}
        </ImageList>
        <Typography variant="h6" fontWeight={100}>
          Latest Conversations
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>


          {Object.keys(messages).map((key) => {
            console.log(messages)
            return (
              <div key={uuid()} >

                <ListItem alignItems="flex-start" sx={{ display: "flex", alignItems: "center" }}>
                  <AvatarGroup sx={{ marginRight: "5px" }}>
                    <Avatar alt="From user" src={`${serverUrl}/users/${messages[key]["from"]}/profileImage`} />
                    {/* (<img src={process.env.PUBLIC_URL + '/online.png'} height="13px" alt="logo" />) */}
                  </AvatarGroup>
                  <ListItemText
                    primary={messages[key]["subject"]}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          @{key}
                        </Typography>
                        —{messages[key]["message"]}
                      </React.Fragment>
                    }
                  />
                  <Button onClick={() => { setExpanded(true) }} >reply</Button>
                </ListItem>
                <Divider variant="inset" component="li" />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "right", width: "100%", marginBottom: "3px" }}>
                    <form onSubmit={(e) => {
                      sendWsMessage(e, messages[key]["from"]);
                      console.log(e.target)
                    }}>
                      <TextField id="standard-basic" label="Reply" variant="standard" name='message' />
                      <Button type="submit" size='large'><SendIcon /></Button>
                    </form>
                  </Box>
                </Collapse>
              </div>)
          })}
        </List>
        <form onSubmit={sendWsMessage}>
          <input name={"toUserId"} placeholder={"to"} />
          <input name={"message"} placeholder={"message"} />
          <input name={"subject"} placeholder={"subject"} />
          <Button type="submit" size='large'>test</Button>
        </form>
      </Box>
    </Box>
  )
}

export default Rightbar