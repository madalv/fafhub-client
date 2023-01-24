import { makeAutoObservable, reaction } from "mobx";
import { Room } from "../models/Room";
import { agent } from "../api/agent";
import { store } from "./store";
import { Message } from "../models/Message";
import { User } from "../models/User";

// TODO persist selected room id

const booleanify = (value: string | null): boolean => {
  const truthy: string[] = [
    'true',
    'True',
    '1'
  ]

  return value ? truthy.includes(value) : false
}

export default class RoomStore {
  rooms: Room[] = [];
  selectedRoom: Room | null = null;
  generalRoom: Room | null = null;
  announcementsRoom: Room | null = null;
  selectedRoomId: string | null = window.localStorage.getItem("selroomid");
  generalRoomId: string = "general";
  announcementsRoomId: string = "announcements";
  msgCounter: number = 0
  canSendMsg: boolean = window.localStorage.getItem("canSendMsg") ? booleanify(window.localStorage.getItem("canSendMsg")) : true

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.selectedRoomId,
      (selectedRoomId) => {
        if (selectedRoomId)
          window.localStorage.setItem("selroomid", selectedRoomId);
        else window.localStorage.removeItem("selroomid");
      }
    );
  }


  setCanSendMsg = (b: boolean) => {
    window.localStorage.setItem("canSendMsg", String(b))
    this.canSendMsg = b
  }

  incMsgCounter = () => {
    this.msgCounter += 1
  }

  resetMsgCounter = () => {
    this.msgCounter = 0
  }

  setNotifs = (id: string) => {
    let room: Room | undefined = this.rooms.find((r) => r.id === id);
    if (room) {
      room.notifications = true
    }
  }

  setSelectedRoomId = (id: string) => {
    this.selectedRoomId = id;
  };

  setGeneralRoom = async () => {
    await agent.Rooms.details(this.announcementsRoomId).then((room) => {
      this.announcementsRoom = room;
      //console.log(JSON.stringify(this.announcementsRoom))
    });
    await agent.Rooms.details(this.generalRoomId).then((room) => {
      this.generalRoom = room;
      //console.log(JSON.stringify(this.generalRoom))
    });
  };

  setSelectedRoom = async (roomId: string) => {
    // TODO optimize this bs

    switch (roomId) {
      case this.generalRoomId:
        this.selectedRoom = this.generalRoom;
        break;
      case this.announcementsRoomId:
        this.selectedRoom = this.announcementsRoom;
        break;
      default:
        // @ts-ignore
        let room: Room = this.rooms.find((r) => r.id === roomId);
        room.notifications = false
        this.selectedRoom = room

        break;
    }
    this.setSelectedRoomId(roomId);
    this.loadMessagesForRoom(this.selectedRoom!!).then();
    this.loadUsersForRoom(this.selectedRoom!!).then();
  };

  loadUsersForRoom = async (room: Room) => {
    try {
      //const room = this.rooms.find(r => r.id === roomId)

      await agent.Rooms.details(room.id).then((r) => {
        this.setUsers(room!!, r.users);
      });
      //console.log(JSON.stringify(room))
    } catch (e) {
      console.log(e);
    }
  };

  setUsers(room: Room, users: User[]) {
    room!!.users = users;
  }

  unsetSelectedRoom = () => {
    this.selectedRoom = null;
  };

  loadMessagesForRoom = async (room: Room) => {
    try {
      //const room = this.rooms.find(r => r.id === roomId)
      this.setMessages(room!!, await agent.Rooms.messages(room.id).then());
    } catch (e) {
      console.log(e);
    }
  };

  deleteMessageFromSelectedRoom = (msgId: string) => {
    let msgIndex = this.selectedRoom!.messages.findIndex(m => m.id === msgId)
    this.selectedRoom!.messages[msgIndex].text = "Message deleted"
    this.selectedRoom!.messages[msgIndex].command = "DeleteMessage"
  }

  editMessageFromSelectedRoom = (msgId: string, text: string) => {
    let msgIndex = this.selectedRoom!.messages.findIndex(m => m.id === msgId)
    this.selectedRoom!.messages[msgIndex].text = text
    this.selectedRoom!.messages[msgIndex].command = "UpdateMessage"
  }

  addNewMessageToRoom = (roomId: string, message: Message) => {
    let room: Room | null;
    switch (roomId) {
      case this.generalRoomId:
        room = this.generalRoom;
        break;
      case this.announcementsRoomId:
        room = this.announcementsRoom;
        break;
      default:
        // @ts-ignore
        room = this.rooms.find((r) => r.id === roomId);
        break;
    }
    //console.log("messages: " + JSON.stringify(room!!.messages))
    this.setMessages(room!!, [message, ...room!!.messages]);
  };

  addMessageToSelectedRoom = (message: Message) => {
    if (this.selectedRoom === null) this.setSelectedRoom(this.selectedRoomId!).then(() => {
      this.setMessages(this.selectedRoom!, [message, ...this.selectedRoom!.messages]);
    })
    else this.setMessages(this.selectedRoom!, [message, ...this.selectedRoom!.messages]);
  }

  setMessages = (room: Room, messages: Message[]) => {
    room!!.messages = messages;
  };

  loadRooms = async () => {
    try {
      const user = await agent.Account.current();
      this.setRooms(user.rooms);
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
      store.wsStore.ws?.send(
        JSON.stringify({
          text: roomName,
          command: "CreateRoom",
          targetId: "anything",
          roomId: "anything",
        })
      );
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  update = async (roomName: string, roomId: string) => {
    try {
      store.wsStore.ws?.send(
          JSON.stringify({
            text: roomName,
            command: "UpdateRoom",
            targetId: roomId,
            roomId: roomId
          })
      )
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  }

  delete = async (roomId: string) => {
    try {
      store.wsStore.ws?.send(
        JSON.stringify({
          text: "anything",
          command: "DeleteRoom",
          targetId: roomId,
          roomId: roomId,
        })
      );
    } catch (error) {
      throw error;
    }
  };

  removeUser = async (roomId: string, userId: string) => {
    try {
      store.wsStore.ws?.send(
          JSON.stringify({
            text: "anything",
            command: "RemoveUser",
            targetId: userId,
            roomId: roomId
      }))
    } catch (error) {
      throw error;
    }
  }

}
