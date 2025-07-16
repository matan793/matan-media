
import React from 'react';
import {
  CardActions,
  IconButton,
  Box,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';

interface PostActionsProps {
  likes: number;
  isLiked: boolean;
  onLike: () => void;
  onComment: () => void;
  commentsExpanded: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({
  likes,
  isLiked,
  onLike,
  onComment,
  commentsExpanded,
}) => {
  return (
    <CardActions sx={{ pt: 1, pb: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={onLike} color={isLiked ? 'error' : 'default'}>
          {isLiked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <IconButton onClick={onComment}>
          {commentsExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        <IconButton onClick={onComment}>
          <ChatBubbleOutline />
        </IconButton>
      </Box>
    </CardActions>
  );
};

export default PostActions;