import {makeAutoObservable} from "mobx";
import {Room} from "../models/Room";
import {agent} from "../api/agent";

export default class RoomStore {
    rooms: Room[] = []
    selectedRoom: Room | null = null

    constructor() {
        makeAutoObservable(this)
    }

    loadRooms = async () => {
        try {
            const rooms = await agent.Rooms.list()
            this.setRooms(rooms)
        } catch (error) {
            console.log(error)
        }
    }

    setRooms = (rooms: Room[]) => {
        this.rooms = rooms
    }
}