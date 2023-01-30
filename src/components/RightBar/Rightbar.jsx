import React, { useState } from 'react'
import { Box, Button, Typography, Avatar, AvatarGroup, ImageList, ImageListItem, List, ListItem, ListItemText, Divider, Collapse, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { v4 as uuid } from 'uuid';
import { serverUrl } from '../../config';


const client = new W3CWebSocket('ws://192.168.0.17:8081/messaging');

function Rightbar() {
  const [messages, setMessges] = useState({});
  const [expanded,setExpanded] = useState(false);
  client.onopen = () => {
    console.log('WebSocket Client Connected');
  };
  client.onmessage = (event) => {
    const jsonData = JSON.parse(event.data)
    const payload = JSON.parse(jsonData.Payload)
    console.log(payload)
    setMessges({ ...messages, [payload.fromUserName]: { from: payload.from, subject: payload.subject, message: payload.message } })
  };
  function sendWsMessage(e, toId) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    client.send(JSON.stringify({ message: form.get("message"), to: toId || form.get("to"), subject: form.get("subject") }))
  }
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" }, marginRight:"5%" }}>
      <Box position="fixed" width={"30%"} mt={2}>
        <Typography variant="h6" fontWeight={100}>
          Online friends
        </Typography>
        <AvatarGroup max={4}>
          <Avatar alt="Remy Sharp" src={`${serverUrl}/users/${1}/profileImage`} />
          <Avatar alt="Travis Howard" src={`${serverUrl}/users/${2}/profileImage`} />
          <Avatar alt="Cindy Baker" src={`${serverUrl}/users/${3}/profileImage`} />
          <Avatar alt="Agnes Walker" src={`${serverUrl}/users/${4}/profileImage`} />
          <Avatar alt="Trevor Henderson" src={`${serverUrl}/users/${5}/profileImage`} />
        </AvatarGroup>
        <Typography variant="h6" fontWeight={100}>
          Latest Photos
        </Typography>
        <ImageList cols={3} rowHeight={150}>
          <ImageListItem >
            <img
              src="https://material-ui.com/static/images/image-list/breakfast.jpg"
            />
          </ImageListItem>
          <ImageListItem >
            <img
              src="https://material-ui.com/static/images/image-list/burgers.jpg"
            />
          </ImageListItem><ImageListItem >
            <img
              src="https://material-ui.com/static/images/image-list/camera.jpg"
            />
          </ImageListItem>
        </ImageList>
        <Typography variant="h6" fontWeight={100}>
          Latest Conversations
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>


          {Object.keys(messages).map((key) => {
           
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
                  <Button onClick={()=>{setExpanded(true)}} >reply</Button>
                </ListItem>
                <Divider variant="inset" component="li" />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "right", width: "100%", marginBottom: "3px" }}>
                    <form onSubmit={(e)=>{
                      sendWsMessage(e,messages[key]["from"]);
                      console.log(e.target)
                      }}>
                      <TextField id="standard-basic" label="Reply" variant="standard"  name='message'/>
                      <Button type="submit" size='large'><SendIcon /></Button>
                    </form>
                  </Box>
                </Collapse>
              </div>)
          })}
        </List>
        <form onSubmit={sendWsMessage}>
          <input name={"to"} placeholder={"to"} />
          <input name={"message"} placeholder={"message"} />
          <input name={"subject"} placeholder={"subject"} />
          <Button type="submit" size='large'>test</Button>
        </form>
      </Box>
    </Box>
  )
}

export default Rightbar