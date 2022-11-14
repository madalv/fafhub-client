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

  addUserToSelectedRoom() {

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
      this.setMessages(room!!, await agent.Rooms.messages(roomId).then())
    } catch (e) {
      console.log(e)
    }
  }

  addNewMessageToRoom = (roomId: string, message: Message) => {
    const room = this.rooms.find(r => r.id === roomId)
    this.setMessages(room!!, [message, ...room!!.messages])
  }

  setMessages(room: Room, messages: Message[]) {
    room!!.messages = messages
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
      console.log(store.wsStore.isConnected())
      store.wsStore.ws?.send(JSON.stringify({"text": roomName, "command": "CreateRoom",
        "targetId": "anything", "roomId": "anything"}))
      store.modalStore.closeModal();
      await this.loadRooms()
    } catch (error) {
      throw error;
    }
  };
}
