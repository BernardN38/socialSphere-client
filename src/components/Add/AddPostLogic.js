import { useState } from 'react'
import axios from "axios"
import { serverUrl } from '../../config';
import { useNavigate } from 'react-router-dom';


function AddPost(setRefresh, refresh) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    
    const createPost = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        console.log(formData.get("image"), formData.get("body"))
        axios.post(`${serverUrl}/posts`, formData, { withCredentials: true }).then((resp) => {
            setOpen(false);
            setRefresh(!refresh);
        }

        ).catch((error) => {
            if (error.response.status === 401) {
                navigate("/login")
            }
            console.log(error)
        })
    }
    return { open, setOpen, createPost }
}

export default AddPost;