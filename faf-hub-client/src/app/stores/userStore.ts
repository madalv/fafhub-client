import { User, UserFormValues } from "../models/User";
import { makeAutoObservable, runInAction } from "mobx";
import { agent } from "../api/agent";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const token = await agent.Account.login(creds);
      store.commonStore.setToken(token.token);
      store.roomStore.setSelectedRoom(store.roomStore.generalRoomId)
      await this.setUser();
      store.wsStore.connect()
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  // getByEmail = async (email: string): Promise<User> => {
  //   const user: User = await agent.Account.getByEmail({"email": email})
  //   console.log(user)
  //   return user
  // }

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
