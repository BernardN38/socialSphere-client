import React, { useEffect } from 'react'
import { Box } from "@mui/material";
import Post from '../Post/Post';
import InfiniteScroll from "react-infinite-scroll-component";
import FeedLogic from './FeedLogic';





const endMessage = () => {
  return (<p style={{ textAlign: 'center' }}>
    <b>Yay! You have seen it all</b>
  </p>)
}

function Feed({ pageSize = 5, userId, refresh }) {
  const { posts, hasMore, getNext, initFeed, deletePost } = FeedLogic(pageSize, userId);
  useEffect(() => {
    initFeed();
  }, [refresh, userId])
  return (
    <Box flex={4} p={2}>{
      posts ?
        <InfiniteScroll
          dataLength={posts.length} //This is important field to render the next data
          next={e => getNext(pageSize)}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={endMessage()}
          refreshFunction={initFeed}
          pullDownToRefresh
          pullDownToRefreshThreshold={75}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center', marginBottom:"3px" }}>&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center',marginBottom:"3px" }}>&#8593; Release to refresh</h3>
          }
          
        >
          {
            posts.map((el) => <Post key={el.ID} postId={el.ID} authorName={el.AuthorName} userId={el.UserID}body={el.Body} date={el.CreatedAt} imageId={el.ImageID} deletePost={deletePost} likeCount={el.Likecount}/>)
          }
        </InfiniteScroll> : "Nothing to see here"
    }
    </Box>
  )
}

export default Feed;