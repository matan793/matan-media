import { PostData } from "./utils/types";
import React from 'react';
import { Box } from '@mui/material';
import Post from './components/Post/Post';
import { usePosts } from "./hooks/usePosts";
const InstagramPostDemo: React.FC = () => {
  // const samplePost: PostData = {
  //   id: '1',
  //   username: 'john_doe',
  //   userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
  //   location: 'New York, NY',
  //   timestamp: '2 hours ago',
  //   caption: 'Beautiful sunset from my balcony! 🌅 Nothing beats this view after a long day. #sunset #newyork #photography',
  //   imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=468&h=468&fit=crop',
  //   likes: 1247,
  //   comments: [
  //     {
  //       id: '1',
  //       username: 'jane_smith',
  //       text: 'Wow, absolutely stunning! 😍',
  //       timestamp: '1 hour ago',
  //       avatar: 'https://images.unsplash.com/photo-1494790108755-2616b68e3333?w=32&h=32&fit=crop&crop=face',
  //     },
  //     {
  //       id: '2',
  //       username: 'mike_photo',
  //       text: 'Great shot! What camera did you use?',
  //       timestamp: '45 minutes ago',
  //       avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
  //     },
  //     {
  //       id: '3',
  //       username: 'sarah_travels',
  //       text: 'I miss NYC so much! Thanks for sharing ❤️',
  //       timestamp: '30 minutes ago',
  //       avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
  //     },
  //     {
  //       id: '4',
  //       username: 'alex_wanderer',
  //       text: 'The colors are incredible! Nature never fails to amaze me.',
  //       timestamp: '25 minutes ago',
  //       avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
  //     },
  //     {
  //       id: '5',
  //       username: 'photo_enthusiast',
  //       text: 'Perfect timing! The golden hour is magical ✨',
  //       timestamp: '20 minutes ago',
  //       avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face',
  //     },
  //   ],
  //   isLiked: false,
  //   isFollowing: false,
  // };
  const {posts} = usePosts();
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
      
      {posts.length > 0 && <Post
        post={posts[0]} // Assuming posts is not empty
        onLike={handleLike}
        onComment={handleComment}
        onFollow={handleFollow}
      />}
    </Box>
  );
};

export default InstagramPostDemo;