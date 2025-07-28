// import { PostData } from "./utils/types";
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Post from './components/Post/Post';
import { usePosts } from "./hooks/api/usePosts";
import { invoke } from '@tauri-apps/api/core';
import { User } from './utils/types';
import { useNavigate } from 'react-router-dom';
const InstagramPostDemo: React.FC = () => {
  const { posts } = usePosts();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

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

  useEffect(() => {
    const checkUser = async () => {
      try {
        const result = await invoke<User>('get_current_user');
        // If success, save user (or just set a flag)
        
        setLoading(false);
        setUser(result);
        
      } catch (err) {
        // Not logged in → redirect to login
        console.log("not logged in", err);
        
        navigate('/login');
      }
    };

    checkUser();
  }, []);

if(loading){
  return <div>loading...</div>
}
console.log(user);

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 2 }}>

      {posts.length > 0 && posts.map((_, index) => (
        <Post
          key={posts[index]._id.toString()}
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