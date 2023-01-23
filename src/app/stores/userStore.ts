import { User, UserEmail, UserFormValues } from "../models/User";
import { makeAutoObservable, runInAction } from "mobx";
import { agent } from "../api/agent";
import { createAvatar } from "@dicebear/core";
import * as style from "@dicebear/lorelei";
import { store } from "./store";
export default class UserStore {
  user: User | null = null;
  allUsers: User[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAllUsers = async () => {
    this.allUsers = await agent.Account.getAllUsers();
    await Promise.all(
      this.allUsers.map(async (u) => {
        await this.generateAvatar(u);
      })
    );
    // console.log(JSON.stringify(this.allUsers));
  };

  get isLoggedIn() {
    return !!this.user;
  }

  getUserInfo = (userId: string): User | undefined => {
    return this.allUsers?.find((u) => u.id === userId);
  };

  login = async (creds: UserFormValues) => {
    try {
      const token = await agent.Account.login(creds);
      store.commonStore.setToken(token.token);
      // store.roomStore.setSelectedRoom(store.roomStore.generalRoomId)
      await store.roomStore.setGeneralRoom();
      await this.setUser();
      store.wsStore.connect();
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  getUsersByEmail = async (email: string): Promise<User[]> => {
    return await agent.Account.getUsersByEmail(email);
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("selroomid");
    store.roomStore.unsetSelectedRoom();
    this.user = null;
    store.wsStore.disconnect();
  };

  setUser = async () => {
    try {
      const user = await agent.Account.current();
      await this.generateAvatar(user);
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      console.log(creds);
      await agent.Account.register(creds);
      store.modalStore.closeModal();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  sendOtp = async (email: UserEmail) => {
    try {
      await agent.Account.sendOtp(email);
      store.modalStore.closeModal();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  generateAvatar = async (user: User) => {
    const avatar = createAvatar(style, {
      seed: `${user.id}`,
      size: 96,
      beard: [],
      eyebrows: [
        "variant01",
        "variant02",
        "variant03",
        "variant05",
        "variant06",
        "variant07",
        "variant08",
        "variant09",
        "variant10",
        "variant11",
        "variant12",
        "variant13",
      ],
      eyes: [
        "variant01",
        "variant02",
        "variant03",
        "variant04",
        "variant05",
        "variant06",
        "variant07",
        "variant08",
        "variant09",
        "variant10",
        "variant11",
        "variant12",
        "variant14",
        "variant15",
        "variant16",
        "variant17",
        "variant18",
        "variant19",
        "variant20",
        "variant21",
        "variant22",
        "variant23",
        "variant24",
      ],
      hair: [
        "variant01",
        "variant02",
        "variant03",
        "variant04",
        "variant06",
        "variant07",
        "variant08",
        "variant09",
        "variant10",
        "variant11",
        "variant12",
        "variant13",
        "variant15",
        "variant16",
        "variant17",
        "variant18",
        "variant19",
        "variant20",
        "variant21",
        "variant22",
        "variant23",
        "variant24",
        "variant26",
        "variant29",
        "variant30",
        "variant31",
        "variant32",
        "variant33",
        "variant35",
        "variant36",
        "variant37",
        "variant38",
        "variant39",
        "variant40",
        "variant41",
        "variant42",
        "variant43",
        "variant44",
        "variant46",
        "variant47",
        "variant48",
      ],
      head: ["variant02", "variant03", "variant04"],
    });
    await avatar.toDataUri().then((data) => (user.avatarUri = data));
  };
}
