import React, { useState } from 'react'
import { serverUrl } from '../../config';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function FeedLogic(pageSize = 5, userId ) {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const getNext = () => {
        console.log("gettting next")
        let pageNo = (posts.length / pageSize) + 1
        if (pageNo % 1 !== 0) {
            setHasMore(false)
            return
        }
        axios.get(`${serverUrl}/users/${userId}/posts?pageSize=${pageSize}&pageNo=${pageNo}`, { withCredentials: true }).then((resp) => {
            console.log(resp.data.data)
            if (resp.data.data.page === null) {
                setHasMore(false)
                return
            }
            if (resp.data.data.lastPage === true) {
                setHasMore(false)
            }
            setPosts([...posts, ...resp.data.data.page])
        })
    }

    const initFeed = () => {
        axios.get(`${serverUrl}/users/${userId}/posts?pageSize=${pageSize}&pageNo=1`, { withCredentials: true }).then((resp) => {
            console.log(resp.data)
            setPosts(resp.data.data.page)
        }).catch((error) => {
            console.log(error)
            if (error.response.status === 401) {
                navigate("/login")
            }
        })
    }
    const deletePost = (imageId, postId) => {
        axios.delete(`${serverUrl}/posts/${postId}`, { withCredentials: true }).then((resp) => {
            console.log(postId, " deleted")
        }).catch((error) => {
            console.log(error)
        })
        setPosts(posts.filter((el, i) => { return el.ImageID !== imageId }))
    }

    return { posts, setPosts, hasMore, setHasMore, getNext, initFeed, navigate, deletePost }
}

export default FeedLogic;