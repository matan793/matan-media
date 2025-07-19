
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
import { useScreenWidth } from '../../context/ScreenWidth';

interface PostActionsProps {
  likes: number;
  isLiked: boolean;
  onLike: () => void;
  onComment: () => void;
  commentsExpanded: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({
  isLiked,
  onLike,
  onComment,
  commentsExpanded,
}) => {
  const { width } = useScreenWidth();
  const isLargeScreen = width >= 768;
  return (
    <CardActions sx={{ pt: 1, pb: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={onLike} color={isLiked ? 'error' : 'default'}>
          {isLiked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        {/* <IconButton onClick={onComment}>
          {commentsExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton> */}
        {!isLargeScreen &&
          <IconButton onClick={onComment}>
            <ChatBubbleOutline />
          </IconButton>
        }
      </Box>
    </CardActions>
  );
};

export default PostActions;