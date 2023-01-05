import { useState } from 'react'
import axios from "axios"
import { serverUrl } from '../../config';


function ProfileImageUploadFormLogic(setRefresh, refresh) {
    const [open, setOpen] = useState(false);

    const uploadProfileImage = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        console.log(formData.get("image"), formData.get("body"))

        axios.post(`${serverUrl}/users/profileImage`, formData, { withCredentials: true }).then((resp) => {
            setOpen(false);
        }
        ).catch((error) => {
            console.log(error)
        })
    }
    return { open, setOpen, uploadProfileImage }
}

export default ProfileImageUploadFormLogic;