export interface User {
  id: string;
  username: string;
  profilePicture: string;
}

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: User;
}

export interface PostData {
  id: string;
  username: string;
  profile_picture: string;
  timestamp: string;
  caption: string;
  imageUrl: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  isFollowing: boolean;
}