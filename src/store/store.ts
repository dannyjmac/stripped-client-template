import { makeAutoObservable } from "mobx";
import { AuthAPI } from "../api";
import { AuthStore } from "./stores";

export class Store {
  // Child Stores
  authStore = new AuthStore(this);

  // UI Logic state - all the state for all user interaction
  // discover = new DiscoverView(this);
  api: {
    authAPI: AuthAPI;
  };

  constructor(authAPI: AuthAPI) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this.api = { authAPI };
  }
}

export const createStore = () => {
  const authAPI = new AuthAPI();
  return new Store(authAPI);
};
