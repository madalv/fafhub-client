import { Base } from './Base'
import { Room } from './Room'
import { User } from './User'

export interface Message extends Base {
	roomId: string
	text: string
	command: "CreateMessage" | "UpdateMessage" | "DeleteMessage"
			| "AddUser" | "RemoveUser" | "CreateRoom" | "UpdateRoom" | "DeleteRoom"
	targetId: string
	room?: Room
	userId: string
	user?: User
}

