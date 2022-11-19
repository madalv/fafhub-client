import {makeAutoObservable, reaction, runInAction} from "mobx";
import {Room} from "../models/Room";
import {agent} from "../api/agent";
import {store} from "./store";
import {Message} from "../models/Message";
import {User} from "../models/User";

// TODO persist selected room id

export default class RoomStore {
  rooms: Room[] = [];
  selectedRoom: Room | null = null;
  generalRoom: Room | null = null;
  announcementsRoom: Room | null = null;
  selectedRoomId: string | null = window.localStorage.getItem('selroomid')
  generalRoomId: string = "general";
  announcementsRoomId: string = "announcements"

  constructor() {
    makeAutoObservable(this);
    reaction(
        () => this.selectedRoomId,
        selectedRoomId => {
          if (selectedRoomId) window.localStorage.setItem('selroomid', selectedRoomId)
          else window.localStorage.removeItem('selroomid')
        }
    )
  }

  setSelectedRoomId = (id: string) => {
    this.selectedRoomId = id
}

  setGeneralRoom = async () => {
    await agent.Rooms.details(this.announcementsRoomId).then(room => {
      this.announcementsRoom = room
      //console.log(JSON.stringify(this.announcementsRoom))
    })
    await agent.Rooms.details(this.generalRoomId).then(room => {
      this.generalRoom = room
      //console.log(JSON.stringify(this.generalRoom))
    })

  }

  setSelectedRoom = async (roomId: string) => {
    // TODO optimize this bs
    // @ts-ignore
    this.selectedRoom = this.rooms.find(r => r.id === roomId)
    this.setSelectedRoomId(roomId)
    //console.log(this.selectedRoom!!.name)
    this.loadMessagesForRoom(this.selectedRoom!!.id).then()
    this.loadUsersForRoom(this.selectedRoom!!.id).then()
  }

  loadUsersForRoom = async (roomId: string) => {
    try {
      const room = this.rooms.find(r => r.id === roomId)

      await agent.Rooms.details(roomId).then(r => {
        this.setUsers(room!!, r.users)
      })
      //console.log(JSON.stringify(room))
    } catch (e) {
      console.log(e)
    }
}

setUsers(room: Room, users: User[]) {
  room!!.users = users
}

  unsetSelectedRoom = () => {
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
    //console.log("messages: " + JSON.stringify(room!!.messages))
    this.setMessages(room!!, [message, ...room!!.messages])
  }

  setMessages = (room: Room, messages: Message[]) =>  {
    room!!.messages = messages
  }

  loadRooms = async () => {
    try {
      const user = await agent.Account.current();
      this.setRooms([this.generalRoom!!, this.announcementsRoom!!, ...user.rooms]);
      //console.log(JSON.stringify(this.rooms))
    } catch (error) {
      console.log(error);
    }
  };

  setRooms = (rooms: Room[]) => {
    this.rooms = rooms;
  };

  create = async (roomName: string) => {
    try {
      store.wsStore.ws?.send(JSON.stringify({
        "text": roomName,
        "command": "CreateRoom",
        "targetId": "anything",
        "roomId": "anything"}))
      store.modalStore.closeModal();
      await this.loadRooms()
    } catch (error) {
      throw error;
    }
  };

  delete = async (roomId: string) => {
    try {
      store.wsStore.ws?.send(JSON.stringify({
        "text": "anything",
        "command": "DeleteRoom",
        "targetId": roomId,
        "roomId": roomId}))
      await this.loadRooms().then(() => {
          store.roomStore.setSelectedRoom(store.roomStore.generalRoomId)
      })

    } catch (error) {
      throw error;
    }
}
}
