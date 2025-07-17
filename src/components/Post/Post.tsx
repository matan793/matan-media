import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import { PostData, Comment } from '../../utils/types';
import PostHeader from './PostHeader';
import PostActions from './PostActions';
import CommentsSection from './CommentSection';
import { useScreenWidth } from '../../context/ScreenWidth';

interface PostProps {
  post: PostData;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, text: string) => void;
  onFollow?: (username: string) => void;
}

const Post: React.FC<PostProps> = ({
  post,
  onLike,
  onComment,
  onFollow,
}) => {
  const [postData, setPostData] = useState<PostData>(post);
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const { width } = useScreenWidth();
  const isLargeScreen = width >= 768;

  const handleLike = () => {
    setPostData(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
    }));
    onLike?.(post.id);
  };

  const handleToggleComments = () => {
    setCommentsExpanded(!commentsExpanded);
  };

  const handleCloseComments = () => {
    setCommentsExpanded(false);
  };

  const handleFollow = () => {
    setPostData(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
    }));
    onFollow?.(post.username);
  };

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      username: 'current_user',
      text,
      timestamp: 'now',
      avatar: '/api/placeholder/32/32',
    };

    setPostData(prev => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }));
    onComment?.(post.id, text);
  };

  return (
    <Card sx={{ maxWidth: 468, mx: 'auto', mb: 3, border: '1px solid #dbdbdb' }}>
      <PostHeader
        username={postData.username}
        userAvatar={postData.userAvatar}
        location={postData.location}
        timestamp={postData.timestamp}
        isFollowing={postData.isFollowing}
        onFollow={handleFollow}
      />

      <CardMedia
        component="img"
        image={postData.imageUrl}
        alt="Post content"
        sx={{ aspectRatio: '1/1', objectFit: 'cover' }}
      />

      <PostActions
        likes={postData.likes}
        isLiked={postData.isLiked}
        onLike={handleLike}
        onComment={handleToggleComments}
        commentsExpanded={commentsExpanded}
      />

      <CardContent sx={{ pt: 0, pb: 1 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {postData.likes.toLocaleString()} likes
        </Typography>

        <Typography variant="body2">
          <Typography component="span" fontWeight="bold" variant="body2">
            {postData.username}
          </Typography>{' '}
          {postData.caption}
        </Typography>
      </CardContent>
      {isLargeScreen ? (
        <></>
      ) : (
        <>
          <Divider sx={{ mb: 2 }} />
          <CommentsSection
            comments={postData.comments}
            onAddComment={handleAddComment}
            isExpanded={commentsExpanded}
            onClose={handleCloseComments}
          />
        </>
      )}



    </Card>
  );
};
export default Post;