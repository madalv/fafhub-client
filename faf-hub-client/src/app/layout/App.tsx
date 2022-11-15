import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {Navigate, Route, Routes, useLocation, IndexRouteObject} from "react-router-dom";
import HomePage from "../../features/homepage/HomePage";
import { useStore } from "../stores/store";
import NavBar from "./NavBar";
import ModalContainer from "../common/modals/ModalContainer";
import PrivateRoutes from "./PrivateRoutes";
import Rooms from "../../features/rooms/roomsPage/Rooms";

const App: React.FC = () => {
  const { userStore, commonStore, wsStore, roomStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.setUser().then(() => {
        wsStore.connect()
        roomStore.setGeneralRoom()
        roomStore.setAnnouncementsRoom()

        if (roomStore.selectedRoomId) {
          roomStore.loadRooms().then(() => {
            roomStore.setSelectedRoom(roomStore.selectedRoomId!!)
          })
        } else roomStore.setSelectedRoom(roomStore.generalRoomId)

        commonStore.setIsLoaded(true)
      })
    }
  }, [commonStore, userStore, wsStore]);
  return (
    <>
      <ModalContainer />
      {useLocation().pathname !== "/" && <NavBar />}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/rooms" element={<Rooms />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default observer(App);
