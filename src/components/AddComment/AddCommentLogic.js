import { useState } from 'react'
import axios from "axios"
import { serverUrl } from '../../config';
import { useNavigate } from 'react-router-dom';


function AddComment(comments, setComments, postId) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const createComment = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        axios.post(`${serverUrl}/posts/${postId}/comments`, { body: formData.get("body") }, { withCredentials: true }).then((resp) => {
            console.log(resp)
            setComments([...comments||'', { Body: formData.get("body"), AuthorName: resp.data.data.AuthorName, UserID: resp.data.data.UserID}]);
        setOpen(false);
        });
    }
    return { open, setOpen, createComment }
}

export default AddComment;