import {Outlet, Navigate, useNavigate} from "react-router-dom";
import { useStore } from "../stores/store";
import Rooms from "../../features/rooms/roomsPage/Rooms";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
function PrivateRoutes() {


  const {
    userStore, commonStore
  } = useStore();

  if (!commonStore.isLoaded) return <div>Loading...</div>
  return userStore.isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
export default observer(PrivateRoutes)