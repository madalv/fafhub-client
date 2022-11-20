import axios, { AxiosResponse } from "axios";
import {CreateRoom, Room} from "../models/Room";
import {SearchByEmail, User, UserFormValues} from "../models/User";
import { store } from "../stores/store";
import {Message} from "../models/Message";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "jwt"
)}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Rooms = {
  list: () => requests.get<Room[]>(`/rooms`),
  details: (id: string) => requests.get<Room>(`/rooms/${id}`),
  messages: (id: string) => requests.get<Message[]>(`/messages/${id}`),
  create: (room: CreateRoom) => requests.post(`/rooms`, room),
  update: (room: Room) => requests.put(`/rooms/${room.id}`, room)
};

const Account = {
  current: () => requests.get<User>(`/users/current`),
  login: (user: UserFormValues) => requests.post<User>(`users/login`, user),
  register: (user: UserFormValues) => requests.post<User>(`users/register`, user),
  getUsersByEmail: (email: string) => requests.get<User[]>(`users/email/${email}`),
  getAllUsers: () => requests.get<User[]>(`users`)
};

export const agent = {
  Rooms,
  Account,
};
