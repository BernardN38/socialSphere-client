import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config";

function FriendsLogic() {
    const [foundUsers, setFoundUsers] = useState([]);
    const [expanded, setExpanded] = useState(true);
    const handleFindFriends = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const params = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            params.append(key, value);
        }
        axios.get(`${serverUrl}/friends/find`, { withCredentials: true, params: params }).then((resp) => {
            console.log(resp.data)
            setFoundUsers(resp.data)
            setExpanded(false)
        }).catch((err) => {
            console.log(err.response)
        })
    }
    return { handleFindFriends, foundUsers, expanded, setExpanded }
}

export default FriendsLogic;