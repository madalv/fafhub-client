import { Button, TextArea } from "semantic-ui-react";
import RoomList from "./RoomList";
import UserInfo from "../../userinfo/UserInfo";
import "./styles.css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import CreateRoom from "../roomCreationForm/CreateRoom";
import {useNavigate} from "react-router-dom";
import SelectedRoom from "../selectedRoom/SelectedRoom";
import UserList from "../selectedRoom/UserList";

export default observer(function Rooms() {
  const { modalStore, userStore } = useStore();
  const navigate = useNavigate()
  return (
    <div className="roomContainer mainSection">
      <div className="roomsHeader">
        <h1>Rooms</h1>
        <Button
          className="roomButton"
          inverted
          onClick={() => modalStore.openModal(<CreateRoom />)}>
          + Room
        </Button>
        <Button
          className="roomButton"
          onClick={() => {
            userStore.logout()
            navigate("/")
          }}>
          Logout
        </Button>
        <UserInfo />
      </div>
      <div className="middleSection">
        <div className="roomLeft">
          <div className="ui search">
            <input className="prompt" type="text" placeholder="Search..." />
          </div>
          <div className="roomListContainer">
            <RoomList />
          </div>
        </div>
        <div className="roomMiddle">
            <SelectedRoom></SelectedRoom>
        </div>
        <div className="roomRight">
            <UserList></UserList>
        </div>
      </div>
    </div>
  );
});
