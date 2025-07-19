import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Collapse,
} from "@mui/material";
import { EmojiEmotions, Close } from "@mui/icons-material";
import { Comment } from "../../utils/types";

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
  onClose,
}) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  return (
    <Box sx={{ px: 2, py: 3, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"  }}>
      {/* Always show the first comment */}
      {comments.length > 0 && !isExpanded && (
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">
            <Typography component="span" fontWeight="bold" variant="body2">
              {comments[0].user.username}
            </Typography>{" "}
            {comments[0].content}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {comments[0].created_at.toLocaleString()}
          </Typography>
        </Box>
      )}

      <Collapse in={isExpanded} >
        <Paper
          elevation={0}
          sx={{
            // maxHeight: 300,
            height: "100%",
            overflow: "auto",
            bgcolor: "grey.50",
            borderRadius: 1,
            flexGrow: 1,
            // p: 1,
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              position: "sticky",
              top: 0,
              bgcolor: "grey.50",
              zIndex: 1,
              borderBottom: 1,
              borderColor: "divider",
              py: 1,
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold">
              Comments
            </Typography>
            <IconButton size="small" onClick={onClose}>
              <Close />
            </IconButton>
          </Box>

          {/* <Divider sx={{ mb: 1 }} /> */}

          {comments.map((comment) => (
            <Box key={comment.id} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <Avatar
                  src={comment.user.profile_picture}
                  alt={comment.user.username}
                  sx={{ width: 24, height: 24 }}
                >
                  {comment.user.username[0].toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2">
                    <Typography
                      component="span"
                      fontWeight="bold"
                      variant="body2"
                    >
                      {comment.user.username}
                    </Typography>{" "}
                    {comment.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {comment.created_at.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Paper>
      </Collapse>

      {/* Comment input */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <TextField
          fullWidth
          placeholder="Add a comment..."
          variant="standard"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: "0.875rem" },
          }}
        />
        <IconButton size="small" sx={{ ml: 1 }}>
          <EmojiEmotions />
        </IconButton>
        <Button
          size="small"
          onClick={handleSubmitComment}
          disabled={!commentText.trim()}
          sx={{ minWidth: "auto", ml: 1 }}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default CommentsSection;
