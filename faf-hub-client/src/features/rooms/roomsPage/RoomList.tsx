import React, { useEffect } from "react";
import {Button, Card, Icon, List, Menu} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import {NavLink} from "react-router-dom";


const RoomList: React.FC = () => {
  const { roomStore } = useStore();

  useEffect(() => {
     roomStore.loadRooms().then(() => console.log("in roomlist"));
  }, [roomStore]);

  return (
    <Menu vertical inverted fluid>
      {roomStore.rooms.map((room) => (
            <Menu.Item key={room.id} as={NavLink} className="menuItem" onClick={() => roomStore.setSelectedRoom(room.id)}>
              <div className="menuItemTextWrapper">
                {room.name}: {room.id}
              </div>
              <Button inverted animated='fade' className='delete' onClick={() => roomStore.delete(room.id)}>
                <Button.Content visible> <Icon name="trash" /> </Button.Content>
                <Button.Content hidden>Delete</Button.Content>
              </Button>
            </Menu.Item>
      ))}
    </Menu>
  );
};

export default observer(RoomList);
