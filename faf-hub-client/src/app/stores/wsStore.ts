import {makeAutoObservable} from "mobx";
import {store} from "./store";

export default class WsStore {
    ws: WebSocket | null = null

    constructor() {
        makeAutoObservable(this);
    }

    connect = () => {
        this.ws = new WebSocket(`${process.env.REACT_APP_WS_URL}/?token=${store.commonStore.token}`)
    }

    disconnect = () => {
        this.ws = null
    }

    isConnected = () => {
        return this.ws !== null
    }
}
