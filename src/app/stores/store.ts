import RoomStore from "./roomStore";
import { createContext, useContext } from "react";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import WsStore from "./wsStore";

interface Store {
  roomStore: RoomStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  wsStore: WsStore;
}

export const store: Store = {
  roomStore: new RoomStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  wsStore: new WsStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
