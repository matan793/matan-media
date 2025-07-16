export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  avatar: string;
}

export interface PostData {
  id: string;
  username: string;
  userAvatar: string;
  location?: string;
  timestamp: string;
  caption: string;
  imageUrl: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  isFollowing: boolean;
}