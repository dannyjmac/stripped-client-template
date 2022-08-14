import { makeAutoObservable } from "mobx";
import { AnApi } from "../api";
import { SpecificStore } from "./stores";

export class Store {
  // Child Stores
  authStore = new SpecificStore(this);

  // UI Logic state - all the state for all user interaction
  // discover = new DiscoverView(this);
  api: {
    anApi: AnApi;
  };

  constructor(anApi: AnApi) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this.api = { anApi };
  }
}

export const createStore = () => {
  const anApi = new AnApi();
  return new Store(anApi);
};
