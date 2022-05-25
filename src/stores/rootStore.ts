import {makeAutoObservable} from "mobx";


export class RootStore {
    // authStore = new AuthStore(this);
    // eforStore = new EforStore(this);
    // radarStore = new RadarStore(this);

    constructor() {
        makeAutoObservable(this);
    }
}
