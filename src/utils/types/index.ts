export interface User {
  id: string;
  username: string;
  profile_picture: string;
}

export interface Comment {
  id: string;
  content: string;
  created_at: Date;
  user: User;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  created_at: Date;
  media: string[];
  likes_count: number;
  comments: Comment[];
  user: User;
  isLiked: boolean;// temp
}

export interface LoginCredentials {
  email: string;
  password: string;
}