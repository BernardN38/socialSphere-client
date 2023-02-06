import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function MessagesHeader({fromUser}) {
  return (
    <Box sx={{display:"flex", justifyContent:"center", backgroundColor:"#fafafa"}}>
        <Typography>
            Chatroom with {fromUser.Username}
        </Typography>
    </Box>
  )
}

export default MessagesHeader