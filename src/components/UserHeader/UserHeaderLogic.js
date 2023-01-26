import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config";

function UserHeaderLogic(userId ) {
    const handleFriendRequest = (e) => {
        e.preventDefault();
        let data = {};

        axios.post(`${serverUrl}/friends/friendships/${userId}`,{}, { withCredentials: true }).then((resp) => {
            console.log(resp.data)

        }).catch((err) => {
            console.log(err.response)
        })
    }
    return { handleFriendRequest }
}

export default UserHeaderLogic;