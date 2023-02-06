import { useState } from 'react'
import axios from "axios"
import { serverUrl } from '../../config';
import { useNavigate } from 'react-router-dom';
import Compressor from 'compressorjs';

function AddPostLogic(setRefresh, refresh) {
    const [open, setOpen] = useState(false);
    const [compressedFile, setCompressedFile] = useState(null);
    const navigate = useNavigate();


    const createPost = (event) => {
        event.preventDefault();
        const start = Date.now()
        const formData = new FormData(event.currentTarget)
        new Compressor(formData.get("image"), {
            quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
            success: (compressedResult) => {
                formData.set("image", compressedResult)
                axios.post(`${serverUrl}/posts`, formData, { withCredentials: true }).then((resp) => {
                    setOpen(false);
                    setRefresh(!refresh);
                    console.log(Date.now() - start, "ms")
                }
                ).catch((error) => {
                    if (error.response.status === 401) {
                        navigate("/login")
                    }
                    console.log(error)
                })
            },
        });

    }
    return { open, setOpen, createPost, compressedFile, setCompressedFile }
}

export default AddPostLogic;