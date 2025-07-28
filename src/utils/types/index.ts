import { ObjectId } from "bson";

export interface User {
  id: ObjectId;
  username: string;
  profile_picture: string;
  joined_at: Date | null;
}

export interface Comment {
  id: ObjectId;
  content: string;
  created_at: Date | null;
  user: User;
}

export interface Post {
  _id: ObjectId;
  user_id: ObjectId;
  content: string;
  created_at: string | null;
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