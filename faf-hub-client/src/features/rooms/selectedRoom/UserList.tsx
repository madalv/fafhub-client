import React, { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import { Button, Icon, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

const UserList: React.FC = () => {
  const { roomStore, wsStore } = useStore();


    useEffect(() => {
      // wsStore.ws!!.onclose = (event) => {
      //   roomStore.loadUsersForRoom(roomStore.selectedRoom!!.id).then()
      // }

    }, [wsStore]);

    return (
        <Menu vertical inverted fluid>
            {roomStore.selectedRoom?.users ? roomStore.selectedRoom.users.map((user) => (
                <Menu.Item key={user.id} as={NavLink} className="menuItem">

                    <div className="menuItemTextWrapper">
                        {user.isOnline ? <Icon name="circle" color="green"/>: <></>}
                        {user.email}
                    </div>
                    <Button inverted animated='fade' className='delete'>
                        <Button.Content visible> <Icon name="trash" /> </Button.Content>
                        <Button.Content hidden>Remove</Button.Content>
                    </Button>
                </Menu.Item>
            )) : <div>No users here</div>}
        </Menu>
    );
};

export default observer(UserList);
