import { useState } from 'react'
import axios from "axios"
import { serverUrl } from '../../config';
import { useNavigate } from 'react-router-dom';


function FriendsLogic() {
    const handleFindFriends = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        console.log(formData.get("firstName"), formData.get("lastName"))
    }
    return { handleFindFriends }
}

export default FriendsLogic;