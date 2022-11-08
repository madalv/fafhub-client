import { Base } from './Base'
import {Room} from "./Room";

export interface User extends Base {
	firstName: string
	lastName: string
	email: string
	rooms: Room[]
	token: string
	isOnline: boolean
	roles: string[]
}

export interface UserFormValues {
	email: string
	password: string
	phone?: string
	firstName?: string
	lastName?: string
}
