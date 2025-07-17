import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import { Post as PostData, Comment } from '../../utils/types';
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
      likes_count: prev.isLiked ? prev.likes_count - 1 : prev.likes_count + 1,
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
    // setPostData(prev => ({
    //   ...prev,
    //   isFollowing: !prev.isFollowing,
    // }));
    // onFollow?.(post.username);
  };

  const handleAddComment = (text: string) => {
    // const newComment: Comment = {
    //   id: Date.now().toString(),
    //   username: 'current_user',
    //   text,
    //   timestamp: 'now',
    //   avatar: '/api/placeholder/32/32',
    // };

    // setPostData(prev => ({
    //   ...prev,
    //   comments: [...prev.comments, newComment],
    // }));
    // onComment?.(post.id, text);
  };

  return (
    <>
      {isLargeScreen ? (
        <div style={{ display: 'flex', maxWidth: 900, margin: '0 auto 24px auto', border: '1px solid #dbdbdb', borderRadius: 4, background: '#fff' }}>
          <Card sx={{ flex: 2, border: 'none', boxShadow: 'none', borderRadius: 0 }}>
            <PostHeader
              username={postData.user.username}
              userAvatar={postData.user.profile_picture}
              //location={postData.location}
              timestamp={postData.created_at.toDateString()}
              //isFollowing={postData.isFollowing}
              onFollow={handleFollow}
            />

            <CardMedia
              component="img"
              image={postData.media[0]}
              alt="Post content"
              sx={{ aspectRatio: '1/1', objectFit: 'cover' }}
            />

            <PostActions
              likes={postData.likes_count}
              isLiked={postData.isLiked}
              onLike={handleLike}
              onComment={handleToggleComments}
              commentsExpanded={commentsExpanded}
            />

            <CardContent sx={{ pt: 0, pb: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {postData.likes_count.toLocaleString()} likes_count
              </Typography>

              <Typography variant="body2">
                <Typography component="span" fontWeight="bold" variant="body2">
                  {postData.user.username}
                </Typography>{' '}
                {postData.content}
              </Typography>
            </CardContent>
          </Card>
          <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />
          <div style={{ flex: 1, minWidth: 320, maxWidth: 350, borderLeft: '1px solid #dbdbdb', background: '#fafafa', display: 'flex', flexDirection: 'column' }}>
            <CommentsSection
              comments={postData.comments}
              onAddComment={handleAddComment}
              isExpanded={true}
              onClose={handleCloseComments}
            />
          </div>
        </div>
      ) : (
        <Card sx={{ maxWidth: 468, mx: 'auto', mb: 3, border: '1px solid #dbdbdb' }}>
          <PostHeader
            username={postData.user.username}
            userAvatar={postData.user.profile_picture}
            // location={postData.location}
            timestamp={postData.created_at.toDateString()}
            // isFollowing={postData.isFollowing}
            onFollow={handleFollow}
          />

          <CardMedia
            component="img"
            image={postData.media[0]}
            alt="Post content"
            sx={{ aspectRatio: '1/1', objectFit: 'cover' }}
          />

          <PostActions
            likes={postData.likes_count}
            isLiked={postData.isLiked}
            onLike={handleLike}
            onComment={handleToggleComments}
            commentsExpanded={commentsExpanded}
          />

          <CardContent sx={{ pt: 0, pb: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {postData.likes_count.toLocaleString()} likes_count
            </Typography>

            <Typography variant="body2">
              <Typography component="span" fontWeight="bold" variant="body2">
                {postData.user.username}
              </Typography>{' '}
              {postData.content}
            </Typography>
          </CardContent>
          <Divider sx={{ mb: 2 }} />
          <CommentsSection
            comments={postData.comments}
            onAddComment={handleAddComment}
            isExpanded={commentsExpanded}
            onClose={handleCloseComments}
          />
        </Card>
      )}
    </>
  );
};
export default Post;