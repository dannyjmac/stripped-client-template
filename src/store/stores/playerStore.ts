import { makeAutoObservable, runInAction, toJS } from "mobx";
import { Player, Video } from "../../types";
import { Store } from "../store";

export default class PlayerStore {
  private _store: Store;

  video: Player | null = null;
  numLikes: number | null = null;
  numDislikes: number | null = null;
  hasUserLiked: boolean = false;
  hasUserDisliked: boolean = false;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  /**
   * Gets a video by id
   */
  async getVideo(id: string) {
    const user = this._store.authStore.currentUser;
    try {
      const data = await this._store.api.videoAPI.getVideoById(
        id,
        user ? user.userId : undefined
      );
      if (data?.data) this.video = data.data;
      this.numLikes = data?.data?.likes?.numLikes;
      this.numDislikes = data?.data?.likes?.numDislikes;
      if (data?.data?.likes?.hasUserLiked) {
        this.hasUserLiked = true;
        this.hasUserDisliked = false;
      }
      if (data?.data?.likes?.hasUserDisliked) {
        this.hasUserLiked = false;
        this.hasUserDisliked = true;
      }
    } catch (err) {
      console.log("Error getting Video", id);
    }
  }

  /**
   * User likes a video
   */
  async likeVideo(videoId: string) {
    if (!this._store.authStore.currentUser) return;
    try {
      const data = await this._store.api.videoAPI.likeVideo(
        videoId,
        this._store.authStore.currentUser.userId,
        this._store.authStore.currentUser.token
      );
      if (data.data.success) {
        this.hasUserLiked = true;
        this.hasUserDisliked = false;
        this.numLikes = this.numLikes ? this.numLikes + 1 : 1;
        this.numDislikes = this.numDislikes ? this.numDislikes - 1 : 0;
      }
    } catch (err) {
      console.log("Error liking Video", videoId);
    }
  }

  /**
   * User disikes a video
   */
  async dislikeVideo(videoId: string) {
    if (!this._store.authStore.currentUser) return;
    try {
      const data = await this._store.api.videoAPI.dislikeVideo(
        videoId,
        this._store.authStore.currentUser.userId,
        this._store.authStore.currentUser.token
      );
      if (data.data.success) {
        this.hasUserLiked = false;
        this.hasUserDisliked = true;
        this.numLikes = this.numLikes ? this.numLikes - 1 : 0;
        this.numDislikes = this.numDislikes ? this.numDislikes + 1 : 1;
      }
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
