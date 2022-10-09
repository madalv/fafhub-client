import { Base } from './Base'
import { Room } from './Room'
import { User } from './User'

export interface Message extends Base {
	roomId: string
	room: Room
	userId: string
	user: User
	text: string
	command: string
	targetId: string
}
