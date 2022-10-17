import axios, {AxiosResponse} from 'axios'
import {Room} from "../models/Room";
import {User, UserFormValues} from "../models/User";
<<<<<<< HEAD
import {store} from "../stores/store";

axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`
axios.defaults.headers.common['Content-Type'] = 'application/json'


axios.interceptors.request.use(config => {
    config.headers = config.headers ?? {}
    const token = store.commonStore.token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})
=======

axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`
>>>>>>> main

const responseBody = <T> (response: AxiosResponse<T>) => response.data

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Rooms = {
    list: () => requests.get<Room[]>(`/rooms`),
    details: (id: string) => requests.get<Room>(`/rooms/${id}`),
    create: (room: Room) => requests.post(`/rooms`, room),
    update: (room: Room) => requests.put(`/rooms/${room.id}`, room),
    delete: (id: string) => requests.del(`rooms/${id}`)
}

const Account = {
    current: () => requests.get<User>(`/users/current`),
    login: (user: UserFormValues) => requests.post<User>(`users/login`, user),
    register: (user: UserFormValues) => requests.post<User>(`users/register`, user),
}

export const agent = {
    Rooms,
    Account
}