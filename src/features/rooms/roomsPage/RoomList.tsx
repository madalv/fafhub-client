import React, { useEffect } from "react";
import {Button, Icon, List, Menu} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import "./styles.css";

const RoomList: React.FC = () => {
  const { roomStore } = useStore();

  useEffect(() => {
    roomStore.loadRooms().then();
  }, [roomStore]);

  return (
    <List animated size="large">
      {roomStore.rooms.map((room) => (
        <div className="menuItemContainer" key={room.id}>
          <div className="menuItemWrapper">
            {room.notifications ? <Icon
                className="notificationIcon"
                size="small"
                name="circle" />: <Icon
                color="yellow"
                name="users"/>}
            <List.Item
              as={NavLink}
              className="menuItem"
              id="menuItem"
              onClick={() => roomStore.setSelectedRoom(room.id)}
            >
              {room.name}
            </List.Item>
          </div>
        </div>
      ))}
    </List>
  );
};

export default observer(RoomList);
