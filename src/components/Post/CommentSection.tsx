
import React, { useState } from 'react';
import {
    Avatar,
    IconButton,
    Typography,
    Box,
    Button,
    TextField,
    Divider,
    Paper,
    Collapse,
} from '@mui/material';
import {
    EmojiEmotions,
    Close,
} from '@mui/icons-material';
import { Comment } from '../../utils/types';

interface CommentsSectionProps {
    comments: Comment[];
    onAddComment: (text: string) => void;
    isExpanded: boolean;
    onClose: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
    comments,
    onAddComment,
    isExpanded,
    onClose
}) => {
    const [commentText, setCommentText] = useState('');

    const handleSubmitComment = () => {
        if (commentText.trim()) {
            onAddComment(commentText);
            setCommentText('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmitComment();
        }
    };

    // Show only the first comment when collapsed
    // const displayedComments = isExpanded ? comments : comments.slice(0, 1);

    return (
        <Box sx={{ px: 2, pb: 1 }}>
            {/* Always show the first comment */}
            {comments.length > 0 && !isExpanded && (
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body2">
                        <Typography component="span" fontWeight="bold" variant="body2">
                            {comments[0].username}
                        </Typography>{' '}
                        {comments[0].text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {comments[0].timestamp}
                    </Typography>
                </Box>
            )}

            {/* Show "View more comments" button if there are more comments */}
            {/* {comments.length > 1 && !isExpanded && (
                <Button
                    variant="text"
                    size="small"
                    onClick={() => { }}
                    sx={{ mb: 1, p: 0, color: 'text.secondary', textTransform: 'none' }}
                >
                    View {comments.length - 1} more comment{comments.length > 2 ? 's' : ''}
                </Button>
            )} */}

            {/* Expanded comments section */}
            <Collapse in={isExpanded}>
                <Paper
                    elevation={0}
                    sx={{
                        maxHeight: 300,
                        overflow: 'auto',
                        bgcolor: 'grey.50',
                        borderRadius: 1,
                        p: 1,
                        mb: 1
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                            Comments
                        </Typography>
                        <IconButton size="small" onClick={onClose}>
                            <Close />
                        </IconButton>
                    </Box>

                    <Divider sx={{ mb: 1 }} />

                    {comments.map((comment) => (
                        <Box key={comment.id} sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                <Avatar
                                    src={comment.avatar}
                                    alt={comment.username}
                                    sx={{ width: 24, height: 24 }}
                                >
                                    {comment.username[0].toUpperCase()}
                                </Avatar>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body2">
                                        <Typography component="span" fontWeight="bold" variant="body2">
                                            {comment.username}
                                        </Typography>{' '}
                                        {comment.text}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {comment.timestamp}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Paper>
            </Collapse>

            {/* Comment input */}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TextField
                    fullWidth
                    placeholder="Add a comment..."
                    variant="standard"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                        disableUnderline: true,
                        sx: { fontSize: '0.875rem' },
                    }}
                />
                <IconButton size="small" sx={{ ml: 1 }}>
                    <EmojiEmotions />
                </IconButton>
                <Button
                    size="small"
                    onClick={handleSubmitComment}
                    disabled={!commentText.trim()}
                    sx={{ minWidth: 'auto', ml: 1 }}
                >
                    Post
                </Button>
            </Box>
        </Box>
    );
};

export default CommentsSection;