export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  followers: number;
  following: number;
  verified: boolean;
  bio?: string;
}

export interface Video {
  id: string;
  user: User;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  duration: number;
  createdAt: string;
  hashtags: string[];
  isLiked?: boolean;
  isFollowing?: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  likes: number;
  createdAt: string;
  replies?: Comment[];
}

export interface LiveStream {
  id: string;
  user: User;
  title: string;
  viewers: number;
  duration: number;
  thumbnailUrl: string;
  isLive: boolean;
}
