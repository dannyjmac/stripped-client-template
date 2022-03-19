export interface Video {
  _id: string;
  title: string;
  url: string;
  username: string;
  walletId: string;
  userId: string;
  likes: {
    numDislikes: number;
    numLikes: number;
    hasUserLiked: boolean;
    hasUserDislikes: boolean;
  };
}

export interface User {
  username: string;
  userId: string;
  walletId: string;
  token: string;
}
