import { User, UserFormValues } from "../models/User";
import { makeAutoObservable, runInAction } from "mobx";
import { agent } from "../api/agent";
import { store } from "./store";
import { history } from "../../index";
import {NavigateFunction, useNavigate} from "react-router-dom";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    console.log(!!this.user);
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const token = await agent.Account.login(creds);
      store.commonStore.setToken(token.token);
      await this.setUser();
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    console.log("Logged out!");
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
