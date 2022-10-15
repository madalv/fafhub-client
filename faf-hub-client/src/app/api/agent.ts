import axios, {AxiosResponse} from 'axios'
import {Room} from "../models/Room";

axios.defaults.baseURL = 'http://localhost:8080/api'

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

export const agent = {
    Rooms
}