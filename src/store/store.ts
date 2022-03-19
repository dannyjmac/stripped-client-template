import { makeAutoObservable } from "mobx";
import { VideoAPI, AuthAPI } from "../api";
import { PlayerStore, VideoStore, AuthStore } from "./stores";

export class Store {
  // Child Stores
  playerStore = new PlayerStore(this);
  videoStore = new VideoStore(this);
  authStore = new AuthStore(this);

  // UI Logic state - all the state for all user interaction
  // discover = new DiscoverView(this);
  api: {
    videoAPI: VideoAPI;
    authAPI: AuthAPI;
  };

  constructor(videoAPI: VideoAPI, authAPI: AuthAPI) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this.api = { videoAPI, authAPI };
  }
}

export const createStore = () => {
  const videoAPI = new VideoAPI();
  const authAPI = new AuthAPI();
  return new Store(videoAPI, authAPI);
};
