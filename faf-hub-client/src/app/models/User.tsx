import { Base } from './Base'
import {Room} from "./Room";

export interface User extends Base {
	firstName: string
	lastName: string
	email: string
	rooms: Room[]
	token: string
}

export interface UserFormValues {
	email: string
	password: string
	firstName?: string
	lastName?: string
}
