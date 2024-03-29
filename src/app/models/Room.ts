import { Base } from "./Base";
import { Message } from "./Message";
import { User } from "./User";

export interface Room extends Base {
  name: string;
  ownerId: string;
  users: User[];
  messages: Message[];
  notifications: boolean;
}

export interface CreateRoom {
  name: string;
}
