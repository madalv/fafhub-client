import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Button } from "semantic-ui-react";
import UserInfo from "../../userinfo/UserInfo";
import SelectedRoom from "../selectedRoom/SelectedRoom";
import { useStore } from "../../../app/stores/store";
import { useNavigate } from "react-router-dom";
import UserList from "../selectedRoom/UserList";

const AnnouncementsRoom: React.FC = () => {
  const { userStore, roomStore } = useStore();
  const navigate = useNavigate();
  const middleSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    middleSection.current?.setAttribute(
      "style",
      `min-height:${window.innerHeight * 0.8}px`
    );
  }, [middleSection.current?.clientHeight]);
  useEffect(() => {
    //console.log(JSON.stringify(roomStore.announcementsRoom))
    roomStore.setSelectedRoom(roomStore.announcementsRoomId).then();
  }, [roomStore]);

  return (
    <div className="roomContainer mainSection">
      <div className="roomsHeader">
        <h1>Announcements</h1>

        <UserInfo />
      </div>
      <div className="middleSection" ref={middleSection}>
        <div className="roomMiddle">
          <SelectedRoom />
        </div>
        <div className="roomRight">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default observer(AnnouncementsRoom);
