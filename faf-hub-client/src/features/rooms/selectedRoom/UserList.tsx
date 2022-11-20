import React, { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import { Button, Icon, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

const UserList: React.FC = () => {
  const { roomStore, userStore } = useStore();


  const users = (roomStore.selectedRoom?.id === roomStore.generalRoomId ||
      roomStore.selectedRoom?.id === roomStore.announcementsRoomId) ? userStore.allUsers : roomStore.selectedRoom?.users;

  // console.log(JSON.stringify(users));
  // console.log(JSON.stringify(userStore.allUsers))



    // useEffect(() => {
    //   // wsStore.ws!!.onclose = (event) => {
    //   //   roomStore.loadUsersForRoom(roomStore.selectedRoom!!.id).then()
    //   // }
    //
    // }, [wsStore]);

    return (
        <Menu vertical inverted fluid>
            {users ? users.map((user) => (
                <Menu.Item key={user.id} as={NavLink} className="menuItem">

                    <div className="menuItemTextWrapper">
                        {user.isOnline ? <Icon name="circle" color="green"/>: <></>}
                        {user.email}
                    </div>
                    {/*<Button inverted animated='fade' className='delete'>*/}
                    {/*    <Button.Content visible> <Icon name="trash" /> </Button.Content>*/}
                    {/*    <Button.Content hidden>Remove</Button.Content>*/}
                    {/*</Button>*/}
                </Menu.Item>
            )) : <div>No users here</div>}
        </Menu>
    );
};

export default observer(UserList);
