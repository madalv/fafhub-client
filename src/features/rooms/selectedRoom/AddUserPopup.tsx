import React from "react";
import {Input, List} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { store } from "../../../app/stores/store";
import {User} from "../../../app/models/User";
import {NavLink} from "react-router-dom";

const handleAddUser = (userId: string) => {
    let ws = store.wsStore.ws;
    ws!!.send(
      JSON.stringify({
        text: "anything",
        command: "AddUser",
        targetId: userId,
        roomId: store.roomStore.selectedRoom?.id,
      })
    );
    store.modalStore.closeModal()
}

const AddUserPopup: React.FC = () => {
    const [result, setResult] = React.useState(Array<User>);

    const handleSearch = () => {

        const input = document.getElementById("emailInput") as HTMLInputElement;

        if (input.value != null && input.value !== "") {
            let email = input.value;
            store.userStore.getUsersByEmail(email).then((users) => {
                setResult(users)
                console.log(JSON.stringify(users))
                input.value = "";
            });
        }
    };

  return (
      <>
          <Input
              id="emailInput"
              placeholder="Enter user email"
              action={{
                  content: "Search",
                  onClick: () => handleSearch(),
              }}
          />
          {result.length > 0 ? (
              <List divided animated relaxed>
                  {result.map(user => (
                      <List.Item as={NavLink} onClick={() => handleAddUser(user.id)}>
                          <List.Icon name="user secret"/>
                          {user.email}
                      </List.Item>
                  ))}


              </List>
          ) : null}
      </>
  );
};

export default observer(AddUserPopup);
