import { useStore } from "../../../app/stores/store";
import { Icon, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import React from "react";

const UserList: React.FC = () => {
  const { roomStore, userStore } = useStore();

  const users =
    roomStore.selectedRoom?.id === roomStore.generalRoomId ||
    roomStore.selectedRoom?.id === roomStore.announcementsRoomId
      ? userStore.allUsers
      : roomStore.selectedRoom?.users;

  return (
    <Menu vertical inverted fluid id="userList">
      {users ? (
        users
          .slice()
          .sort((a, b) => Number(b.isOnline) - Number(a.isOnline))
          .map((user) => (
            <Menu.Item key={user.id} as={NavLink} className="menuItem">
              <div className="menuItemTextWrapper">
                {user.isOnline ? <Icon name="circle" color="green" /> : <></>}
                <span>
                  {user.firstName} {user.lastName} ({user.email})
                </span>
              </div>
              {/*<Button inverted animated='fade' className='delete'>*/}
              {/*    <Button.Content visible> <Icon name="trash" /> </Button.Content>*/}
              {/*    <Button.Content hidden>Remove</Button.Content>*/}
              {/*</Button>*/}
            </Menu.Item>
          ))
      ) : (
        <div style={{ color: "white" }}>No users here</div>
      )}
    </Menu>
  );
};

export default observer(UserList);
