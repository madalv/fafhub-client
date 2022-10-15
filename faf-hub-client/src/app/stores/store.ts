import RoomStore from "./roomStore";
import {createContext, useContext} from "react";

interface Store {
    roomStore: RoomStore
}

export const store: Store = {
    roomStore: new RoomStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}