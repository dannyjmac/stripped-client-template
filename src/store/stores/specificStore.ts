import { makeAutoObservable, runInAction, toJS } from "mobx";
import { Store } from "../store";

export default class SpecificStore {
  private _store: Store;

  someData: any = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  async helloWorld() {
    try {
    } catch (err) {
      console.log({ err });
    }
  }
}
