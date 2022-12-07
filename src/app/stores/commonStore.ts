import {makeAutoObservable, reaction} from "mobx";

export default class CommonStore {
    token: string | null = window.localStorage.getItem('jwt')
    isLoaded: boolean = false

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.token,
            token => {
                if (token) window.localStorage.setItem('jwt', token)
                else window.localStorage.removeItem('jwt')
            }
        )
    }

    setIsLoaded = (state: boolean) => {
        this.isLoaded = state
    }

    setToken = (token: string | null) => {
        this.token = token
    }
}