import {User, UserFormValues} from "../models/User";
import {makeAutoObservable, runInAction} from "mobx";
import {agent} from "../api/agent";
import {store} from "./store";
<<<<<<< HEAD
import {useNavigate} from "react-router-dom";
import {history} from "../../index";
=======
>>>>>>> main


export default class UserStore {
    user: User | null = null

    constructor() {
        makeAutoObservable(this)
    }

<<<<<<< HEAD
    isLoggedIn = () => {
=======
    get isLoggedIn() {
>>>>>>> main
        return !!this.user
    }

    login = async (creds: UserFormValues) => {
        try {
<<<<<<< HEAD
            const token = await agent.Account.login(creds)
            store.commonStore.setToken(token.token)
            await this.setUser()
            console.log(this.user?.email)
            console.log(this.isLoggedIn)
            history.push("/rooms") // TODO this isnt working for some reason
=======
            const user = await agent.Account.login(creds)
            store.commonStore.setToken(user.token)
            await this.setUser()
>>>>>>> main
        } catch (error) {
            throw error
        }
    }

    logout = () => {
        store.commonStore.setToken(null)
        window.localStorage.removeItem('jwt')
        this.user = null
<<<<<<< HEAD
        console.log("Logged out!" + this.user)
        history.push("/")
=======
>>>>>>> main
    }

    setUser = async () => {
        try {
            const user = await agent.Account.current()
            runInAction(() => this.user = user)
<<<<<<< HEAD
        } catch (error) {
            console.log(error)
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds)
            // TODO redirect to LOGIN Page
=======
            console.log(this.user)
>>>>>>> main
        } catch (error) {
            throw error
        }
    }
}