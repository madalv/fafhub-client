import {User, UserFormValues} from "../models/User";
import {makeAutoObservable, runInAction} from "mobx";
import {agent} from "../api/agent";
import {store} from "./store";
import {useNavigate} from "react-router-dom";
import {history} from "../../index";


export default class UserStore {
    user: User | null = null

    constructor() {
        makeAutoObservable(this)
    }

    isLoggedIn = () => {
        return !!this.user
    }

    login = async (creds: UserFormValues) => {

        try {
            const token = await agent.Account.login(creds)
            store.commonStore.setToken(token.token)
            await this.setUser()
            console.log(this.user?.email)
            console.log(this.isLoggedIn)
            history.push("/rooms") // TODO this isnt working for some reason
        } catch (error) {
            throw error
        }
    }

    logout = () => {
        store.commonStore.setToken(null)
        window.localStorage.removeItem('jwt')
        this.user = null
        console.log("Logged out!" + this.user)
        history.push("/")
    }

    setUser = async () => {
        try {
            const user = await agent.Account.current()
            runInAction(() => this.user = user)
        } catch (error) {
            console.log(error)
        }
    }
}