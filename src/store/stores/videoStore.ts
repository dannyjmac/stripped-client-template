import { makeAutoObservable, runInAction, toJS } from "mobx";
import { Store } from "../store";

interface Video {
  _id: string;
  title: string;
  url: string;
  username: string;
  walletId: string;
  userId: string;
}

export default class VideoStore {
  private _store: Store;

  userVideos: Video[] | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  /**
   * Gets all videos by a user id
   */
  async getUserVideos(user: string) {
    try {
      const data = await this._store.api.videoAPI.getVideosByUserId(user);
      if (data?.data?.results) this.userVideos = data.data.results;
    } catch (err) {
      console.log("Error getting videos by user");
    }
  }
}
