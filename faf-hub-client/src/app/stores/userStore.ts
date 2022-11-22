import {User, UserFormValues} from "../models/User";
import {makeAutoObservable, runInAction} from "mobx";
import {agent} from "../api/agent";
import {store} from "./store";

export default class UserStore {
  user: User | null = null;
  allUsers: User[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

setAllUsers = async () => {
  this.allUsers = await agent.Account.getAllUsers()
  console.log(JSON.stringify(this.allUsers))
  }

  get isLoggedIn() {
    return !!this.user;
  }

  getUserInfo = (userId: string): User | undefined => {
      return this.allUsers?.find(u => u.id === userId)
  }

  login = async (creds: UserFormValues) => {
    try {
      const token = await agent.Account.login(creds);
      store.commonStore.setToken(token.token);
      // store.roomStore.setSelectedRoom(store.roomStore.generalRoomId)
      await store.roomStore.setGeneralRoom()
      await this.setUser();
      store.wsStore.connect()
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  getUsersByEmail = async (email: string): Promise<User[]> => {
    return await agent.Account.getUsersByEmail(email)
  }

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("selroomid");
    store.roomStore.unsetSelectedRoom()
    this.user = null;
    store.wsStore.disconnect()
  };

  setUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      await agent.Account.register(creds);
      store.modalStore.closeModal();
    } catch (error) {
      console.log(error)
      throw error;
    }
  };
}
