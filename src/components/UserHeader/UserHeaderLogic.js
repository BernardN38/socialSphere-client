import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config";

function UserHeaderLogic(userId) {
    const [userData, setUserData] = useState({});
    const handleFriendRequest = (e) => {
        e.preventDefault();
        let data = {};

        axios.post(`${serverUrl}/friends/friendships/${userId}`, {}, { withCredentials: true }).then((resp) => {
           console.log(resp.data)
        }).catch((err) => {
            console.log(err.response)
        })
    }

    const getUserData = () => {
        axios.get(`${serverUrl}/users/${userId}`, { withCredentials: true }).then((resp) => {
            console.log(resp.data)
            setUserData(resp.data)
        }).catch((err) => { console.log(err.response) })
    }
    return { handleFriendRequest, getUserData, userData }
}

export default UserHeaderLogic;