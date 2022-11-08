import React, { useEffect } from "react";
import {Card, List, Menu} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import {NavLink} from "react-router-dom";

const RoomList: React.FC = () => {
  const { roomStore } = useStore();

  useEffect(() => {
    roomStore.loadRooms().then();
  }, [roomStore]);

  return (
    <Menu vertical inverted fluid>
      {roomStore.rooms.map((room) => (
        <Menu.Item key={room.id} as={NavLink} className="menuItem" onClick={() => roomStore.setSelectedRoom(room.id)}>
            {room.name}: {room.ownerId}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default observer(RoomList);
