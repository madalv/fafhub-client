import { Button } from "semantic-ui-react";
import RoomList from "./RoomList";
import UserInfo from "../../userinfo/UserInfo";
import "./styles.css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import CreateRoom from "../roomCreationForm/CreateRoom";
import SelectedRoom from "../selectedRoom/SelectedRoom";
import UserList from "../selectedRoom/UserList";
import MessageInput from "../selectedRoom/MessageInput";
import RoomSearchBar from "./RoomSearchBar";

export default observer(function Rooms() {
  const { modalStore } = useStore();
  return (
    <div className="roomContainer mainSection">
      <div className="roomsHeader">
        <h1>Rooms</h1>
        <div className="nav">
          <UserInfo />
        </div>
      </div>
      <div className="middleSection">
        <div className="roomLeft">
          <div className="ui search generic__wrapper">
            <RoomSearchBar />
          </div>
          <div className="roomListContainer">
            <RoomList />
            <div className="generic__wrapper">
              <Button
                className="roomButton"
                inverted
                onClick={() => modalStore.openModal(<CreateRoom />)}
              >
                + Room
              </Button>
            </div>
          </div>
        </div>
        <div className="roomMiddle">
          <SelectedRoom />
          <MessageInput />
        </div>
        <div className="roomRight">
          <UserList></UserList>
        </div>
      </div>
    </div>
  );
});
