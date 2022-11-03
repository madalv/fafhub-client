import {makeAutoObservable, runInAction} from "mobx";
import {Room} from "../models/Room";
import {agent} from "../api/agent";
import {store} from "./store";
import {Message} from "../models/Message";

// TODO persist selected room id

export default class RoomStore {
  rooms: Room[] = [];
  selectedRoom: Room | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedRoom(roomId: string) {
    // @ts-ignore
    this.selectedRoom = this.rooms.find(r => r.id === roomId)
    console.log(this.selectedRoom!!.name)
    this.loadMessagesForRoom(this.selectedRoom!!.id).then()
  }

  unsetSelectedRoom() {
    this.selectedRoom = null
  }

  loadMessagesForRoom = async (roomId: string) => {
    try {
      const room = this.rooms.find(r => r.id === roomId)
      await runInAction(async () => room!!.messages = await agent.Rooms.messages(roomId))
    } catch (e) {
      console.log(e)
    }
  }

  addNewMessageToRoom = (roomId: string, message: Message) => {
    const room = this.rooms.find(r => r.id === roomId)
    runInAction(() => room!!.messages = [message, ...room!!.messages])
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
