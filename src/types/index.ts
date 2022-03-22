export interface Video {
  _id: string;
  title: string;
  url: string;
  username: string;
  recieveKey: string;
  userId: string;
  stats: {
    numDislikes: number;
    numLikes: number;
    hasUserLiked: boolean;
    hasUserDislikes: boolean;
  };
}

export interface Comment {
  hasUserUpvoted: boolean;
  id: string;
  upvotes: number;
  userId: string;
  videoId: string;
  text: string;
}

export interface Player {
  _id: string;
  title: string;
  url: string;
  author: {
    username: string;
    userId: string;
    walletId: string;
    recieveKey: string;
  };
  stats: {
    numLikes: string;
    numDislikes: string;
    hasUserDisliked: string;
    hasUserLiked: string;
  };
}

export interface User {
  username: string;
  userId: string;
  walletId: string;
  recieveKey: string;
  token: string;
}

export interface Invoice {
  id: string;
  memo: string;
  ammountSats: number;
  createdAt: number;
  destPubkey: string;
  expiresAt: number;
  walletId: string;
  sessionId: string;
  pr: string;
}

export interface GenerateTipInvoiceProps {
  tipperUserId: string;
  destinationWalletId: string;
  recieverUserId: string;
  videoId: string;
  videoTime: number;
}
