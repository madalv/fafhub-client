import React, { useEffect } from "react";
import { Card, List } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

const RoomList: React.FC = () => {
  const { roomStore } = useStore();

  useEffect(() => {
    roomStore.loadRooms().then();
  }, [roomStore]);
  return (
    <List>
      {roomStore.rooms.map((room) => (
        <List.Item key={room.id}>
          <Card>
            {room.name}: {room.ownerId}
          </Card>
        </List.Item>
      ))}
    </List>
  );
};

export default observer(RoomList);
