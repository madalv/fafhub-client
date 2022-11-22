import React from "react";
import { Button, Popup, Input } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { store } from "../../../app/stores/store";

const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
        handleAddUser();
    }
};

const handleAddUser = () => {
  let ws = store.wsStore.ws;
  const input = document.getElementById("emailInput") as HTMLInputElement;

  if (input.value != null && input.value !== "") {
    let email = input.value;
    store.userStore.getUsersByEmail(email).then((users) => {
      console.log(users[0]);
      ws!!.send(
        JSON.stringify({
          text: "anything",
          command: "AddUser",
          targetId: users[0].id,
          roomId: store.roomStore.selectedRoom?.id,
        })
      );
      input.value = "";
    });
  }
};

const AddUserPopup: React.FC = () => {
  return (
    <Popup trigger={<Button inverted>Add User</Button>} on="click" inverted>
      <Input
          onKeyDown={handleKeyDown}
        id="emailInput"
        placeholder="Enter user email"
        action={{
          content: "Add",
          inverted: true,
          onClick: () => handleAddUser(),
        }}
      />
    </Popup>
  );
};

export default observer(AddUserPopup);
