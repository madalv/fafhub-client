import React, { useEffect } from "react";
import { Button, Icon, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const RoomList: React.FC = () => {
  const { roomStore, userStore } = useStore();

  useEffect(() => {
    roomStore.loadRooms().then();
  }, [roomStore]);

  return (
    <Menu vertical inverted fluid>
      {roomStore.rooms.map((room) => (
        <div className="menuItemContainer" key={room.id}>
          <Menu.Item
            as={NavLink}
            className="menuItem"
            onClick={() => roomStore.setSelectedRoom(room.id)}
          >
            <div className="menuItemTextWrapper">{room.name}</div>
          </Menu.Item>
          {room.ownerId === userStore.user?.id ?
            <Button
            floated="right"
            inverted
            animated="fade"
            className="delete"
            onClick={() => roomStore.delete(room.id)}
            >
            <Button.Content visible>
            <Icon name="trash" />
            </Button.Content>
            <Button.Content hidden>Delete</Button.Content>
            </Button> : <></>}

        </div>
      ))}
    </Menu>
  );
};

export default observer(RoomList);
