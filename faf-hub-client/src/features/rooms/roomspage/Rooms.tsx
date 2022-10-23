import { Button, TextArea } from "semantic-ui-react";
import NavBar from "../../../app/layout/NavBar";
import RoomList from "../room-dashboard/RoomList";
import UserInfo from "../../userinfo/UserInfo";
import "./styles.css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import CreateRoom from "../roomCreationForm/CreateRoom";
export default observer(function Rooms() {
  const { modalStore } = useStore();
  return (
    <div className="roomContainer mainSection">
      <div className="roomsHeader">
        <h1>Rooms</h1>
        <Button
          className="roomButton"
          inverted
          onClick={() => modalStore.openModal(<CreateRoom />)}
        >
          +Room
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
        <div className="roomMiddle"></div>
        <div className="roomRight"></div>
      </div>
    </div>
  );
});
