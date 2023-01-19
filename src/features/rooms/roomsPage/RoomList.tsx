import React, { useEffect } from "react";
import { Button, Icon, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const RoomList: React.FC = () => {
  const { roomStore } = useStore();

  useEffect(() => {
    roomStore.loadRooms().then();
  }, [roomStore]);

  return (
    <Menu vertical inverted fluid>
      {roomStore.rooms.map((room) => (
        <div className="menuItemContainer" key={room.id}>
          <div className="menuItemWrapper">
            <Menu.Item
              as={NavLink}
              className="menuItem"
              id="menuItem"
              onClick={() => roomStore.setSelectedRoom(room.id)}
            >
              {room.name}
            </Menu.Item>
          </div>
          <div className="menuItemWrapper">
            <Button
              floated="right"
              inverted
              size="mini"
              animated="fade"
              className="deleteButton"
              onClick={() => roomStore.delete(room.id)}
            >
              <Button.Content visible>
                <Icon name="trash" />
              </Button.Content>
              <Button.Content hidden>Delete</Button.Content>
            </Button>
          </div>
        </div>
      ))}
    </Menu>
  );
};

export default observer(RoomList);
