import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import UserInfo from "../../userinfo/UserInfo";
import SelectedRoom from "../selectedRoom/SelectedRoom";
import { useStore } from "../../../app/stores/store";
import MessageInput from "../selectedRoom/MessageInput";
import UserList from "../selectedRoom/UserList";

const GeneralRoom: React.FC = () => {
  const { roomStore } = useStore();

  useEffect(() => {
    //console.log(JSON.stringify(roomStore.generalRoom))
    roomStore.setSelectedRoom(roomStore.generalRoomId).then();
  }, [roomStore]);

  return (
    <div className="roomContainer mainSection">
      <div className="roomsHeader">
        <h1>General</h1>

        <UserInfo />
      </div>
      <div className="middleSection">
        <div className="roomMiddle">
          <SelectedRoom />
          <MessageInput />
        </div>
        <div className="roomRight">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default observer(GeneralRoom);
