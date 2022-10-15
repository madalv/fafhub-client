import {User, UserFormValues} from "../models/User";
import {makeAutoObservable, runInAction} from "mobx";
import {agent} from "../api/agent";
import {store} from "./store";


export default class UserStore {
    user: User | null = null

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds)
            store.commonStore.setToken(user.token)
            await this.setUser()
        } catch (error) {
            throw error
        }
    }

    logout = () => {
        store.commonStore.setToken(null)
        window.localStorage.removeItem('jwt')
        this.user = null
    }

    setUser = async () => {
        try {
            const user = await agent.Account.current()
            runInAction(() => this.user = user)
            console.log(this.user)
        } catch (error) {
            throw error
        }
    }
}