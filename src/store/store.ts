import { makeAutoObservable } from "mobx";
import { VideoAPI } from "../api/VideoAPI";
import { PlayerStore, VideoStore } from "./stores";

export class Store {
  // Child Stores
  playerStore = new PlayerStore(this);
  videoStore = new VideoStore(this);

  // UI Logic state - all the state for all user interaction
  // discover = new DiscoverView(this);
  api: {
    videoAPI: VideoAPI;
  };

  constructor(videoAPI: VideoAPI) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this.api = { videoAPI };
  }
}

export const createStore = () => {
  const videoAPI = new VideoAPI();
  return new Store(videoAPI);
};
