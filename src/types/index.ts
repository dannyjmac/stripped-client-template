export interface Video {
  _id: string;
  title: string;
  url: string;
  username: string;
  recieveKey: string;
  userId: string;
  likes: {
    numDislikes: number;
    numLikes: number;
    hasUserLiked: boolean;
    hasUserDislikes: boolean;
  };
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
  likes: {
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
