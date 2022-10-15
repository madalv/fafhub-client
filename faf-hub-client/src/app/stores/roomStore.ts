import {makeAutoObservable} from "mobx";
import {Room} from "../models/Room";

export default class RoomStore {
    rooms: Room[] = []
    selectedRoom: Room | null = null
    loadingInitial = false

    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = () => {
        this.loadingInitial = true

    }

}