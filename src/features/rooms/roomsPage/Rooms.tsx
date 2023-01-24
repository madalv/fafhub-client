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
import { useEffect, useRef } from "react";

export default observer(function Rooms() {
  const middleSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    middleSection.current?.setAttribute(
      "style",
      `height:${window.innerHeight * 0.85}px`
    );
  }, [middleSection.current?.clientHeight]);
  const { modalStore } = useStore();
  return (
    <div className="roomContainer mainSection">
      <div className="roomsHeader">
        <h1>Rooms</h1>
        <div className="nav">
          <UserInfo />
        </div>
      </div>
      <div className="middleSection" ref={middleSection}>
        <div className="roomLeft">
          <div className="ui search generic__wrapper">
            <button
              className="roomButton"
              onClick={() => modalStore.openModal(<CreateRoom />)}
            >
              + Room
            </button>
            <RoomSearchBar />
          </div>
          <div id="searchResultsContainer"></div>
          <div className="roomListContainer">
            <RoomList />
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
