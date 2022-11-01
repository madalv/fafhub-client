import { makeAutoObservable } from "mobx";
import { Room } from "../models/Room";
import { agent } from "../api/agent";
import { store } from "./store";
import { debug } from "console";

export default class RoomStore {
  rooms: Room[] = [];
  selectedRoom: Room | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadRooms = async () => {
    try {
      const user = await agent.Account.current();
      this.setRooms(user.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  setRooms = (rooms: Room[]) => {
    this.rooms = rooms;
  };
  create = async (roomName: string) => {
    try {
      debugger;
      await agent.Rooms.create({ name: roomName });
      store.modalStore.closeModal();
      await this.loadRooms()
    } catch (error) {
      throw error;
    }
  };
}
