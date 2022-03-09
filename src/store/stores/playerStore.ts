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
      if (data?.data?.result) this.video = data.data.result;
    } catch (err) {
      console.log("Error getting Video", id);
    }
  }
}
