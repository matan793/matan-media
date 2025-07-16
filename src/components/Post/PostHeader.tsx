import React from 'react';
import {
  CardHeader,
  Avatar,
  Typography,
  Box,
  Button,
} from '@mui/material';

interface PostHeaderProps {
  username: string;
  userAvatar: string;
  location?: string;
  timestamp: string;
  isFollowing: boolean;
  onFollow: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  username,
  userAvatar,
  location,
  timestamp,
  isFollowing,
  onFollow,
}) => {
  return (
    <CardHeader
      avatar={
        <Avatar src={userAvatar} alt={username}>
          {username[0].toUpperCase()}
        </Avatar>
      }
      title={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            {username}
          </Typography>
          {!isFollowing && (
            <Button
              size="small"
              variant="text"
              color="primary"
              onClick={onFollow}
              sx={{ minWidth: 'auto', p: 0.5, fontSize: '0.75rem' }}
            >
              • Follow
            </Button>
          )}
        </Box>
      }
      subheader={
        <Box>
          {location && (
            <Typography variant="caption" color="text.secondary">
              {location}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary" display="block">
            {timestamp}
          </Typography>
        </Box>
      }
      sx={{ pb: 1 }}
    />
  );
};

export default PostHeader;