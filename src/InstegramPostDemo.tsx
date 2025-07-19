// import { PostData } from "./utils/types";
import React from 'react';
import { Box } from '@mui/material';
import Post from './components/Post/Post';
import { usePosts } from "./hooks/usePosts";
const InstagramPostDemo: React.FC = () => {
  const { posts } = usePosts();
  const handleLike = (postId: string) => {
    console.log('Liked post:', postId);
  };
  console.log('Posts:', posts);


  const handleComment = (postId: string, text: string) => {
    console.log('New comment on post:', postId, 'Comment:', text);
  };

  const handleFollow = (username: string) => {
    console.log('Followed user:', username);
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 2 }}>

      {posts.length > 0 && posts.map((_, index) => (
        <Post
        key={posts[index].id}
          post={posts[index]} // Assuming posts is not empty
          onLike={handleLike}
          onComment={handleComment}
          onFollow={handleFollow}
        />
      ))}
    </Box>
  );
};

export default InstagramPostDemo;