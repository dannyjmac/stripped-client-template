import { makeAutoObservable, runInAction, toJS } from "mobx";
import { Store } from "../store";

// TODO - REDO THIS
interface Video {
  id: string;
  title: string;
  url: string;
  username: string;
  walletId: string;
  userId: string;
}

export default class PlayerStore {
  private _store: Store;

  video: Video | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  /**
   * Gets a video by id
   */
  async getVideo(id: string) {
    try {
      const data = await this._store.api.videoAPI.getVideoById(id);
      if (data?.data) this.video = data.data;
    } catch (err) {
      console.log("Error getting Video", id);
    }
  }

  /**
   * User likes a video
   */
  async likeVideo(userId: string, videoId: string) {
    try {
      const data = await this._store.api.videoAPI.likeVideo(userId, videoId);
      if (data?.data?.result) this.video = data.data.result;
    } catch (err) {
      console.log("Error liking Video", videoId);
    }
  }

  /**
   * User disikes a video
   */
  async dislikeVideo(userId: string, videoId: string) {
    try {
      const data = await this._store.api.videoAPI.dislikeVideo(userId, videoId);
      if (data?.data?.result) this.video = data.data.result;
    } catch (err) {
      console.log("Error liking Video", videoId);
    }
  }

  /**
   * User disikes a video
   */
  async commentVideo(comment: string, userId: string, videoId: string) {
    try {
      const data = await this._store.api.videoAPI.commentVideo(
        comment,
        userId,
        videoId
      );
      if (data?.data?.result) this.video = data.data.result;
    } catch (err) {
      console.log("Error liking Video", videoId);
    }
  }
}
