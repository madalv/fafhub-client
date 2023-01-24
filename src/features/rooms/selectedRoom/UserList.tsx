import { useStore } from "../../../app/stores/store";
import {Button, Icon, Menu} from "semantic-ui-react";
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
              {user.id !== userStore.user!.id
              && roomStore.selectedRoom!.id !== roomStore.generalRoomId
              && roomStore.selectedRoom!.id !== roomStore.announcementsRoomId ? (
                  <div className="menuItemWrapper">
                    <Button
                        floated="right"
                        inverted
                        size="mini"
                        animated="fade"
                        className="deleteButton"
                        onClick={() => roomStore.removeUser(roomStore.selectedRoom!.id, user.id)}
                    >
                      <Button.Content visible>
                        <Icon name="trash" />
                      </Button.Content>
                      <Button.Content hidden>Delete</Button.Content>
                    </Button>
                  </div>
              ) : null}

            </Menu.Item>
          ))
      ) : (
        <div style={{ color: "white" }}>No users here</div>
      )}
    </Menu>
  );
};

export default observer(UserList);
