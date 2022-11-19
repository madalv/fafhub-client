import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { store, useStore } from "../../../app/stores/store";
import "./styles.css";
import { Message } from "../../../app/models/Message";
import { Input } from "semantic-ui-react";
import AddUserPopup from "./AddUserPopup";

// TODO refactor

// TODO fix message duplication after logout -> login
// login 3 times, message is duplicated 3 times, even w diff accounts

// TODO validate message
const handleSend = () => {
  let ws = store.wsStore.ws;
  const input = document.getElementById("message") as HTMLInputElement;
  if (input.value != null && input.value !== "") {
    ws!!.send(
      JSON.stringify({
        text: input.value,
        command: "CreateMessage",
        targetId: store.roomStore.selectedRoom?.id,
        roomId: store.roomStore.selectedRoom?.id,
      })
    );
    input.value = "";
  }
};


const handleKeyDown = (event : React.KeyboardEvent<HTMLDivElement>)  => {
    if (event.key == 'Enter') {
        handleSend()
    }
}

const SelectedRoom: React.FC = () => {
    const {roomStore, commonStore, wsStore, userStore} = useStore();
    // todo move this somewhere else
    useEffect(() => {
        wsStore.ws!!.onmessage = (event) => {
            let msg = JSON.parse(event.data) as Message
            console.log(msg)

            // todo room.messages is undefined
            switch (msg.command) {
                case "CreateMessage":
                    roomStore.addNewMessageToRoom(roomStore.selectedRoom!!.id, msg)
                    break
                case "AddUser":
                    roomStore.loadRooms().then(() => {
                        roomStore.setSelectedRoom(msg.roomId)
                        roomStore.loadUsersForRoom(roomStore.selectedRoomId!!).then()
                        roomStore.addNewMessageToRoom(roomStore.selectedRoom!!.id, msg)
                    })

                    break
                case "DeleteRoom":
                    roomStore.loadRooms().then()
                    break
                case "RemoveUser":
                    break
                case "CreateRoom":
                    roomStore.loadRooms().then(() => {
                        roomStore.setSelectedRoom(msg.roomId).then(
                            () => roomStore.addNewMessageToRoom(roomStore.selectedRoom!!.id, msg)
                        )
                    })
                    break
            }
        }
    })

  return (
    <>
      <h3>
        <b className="defaultMessage">{roomStore.selectedRoom?.name}</b>
      </h3>

        {roomStore.selectedRoom?.ownerId === userStore.user?.id ? <AddUserPopup/> : <></>}

      <div className="messageList">
        {roomStore.selectedRoom?.messages ? (
          roomStore.selectedRoom?.messages
            .slice()
            .reverse()
            .map((message) => (
              <div key={message.id} className="message">
                <b>{message.createdAt}</b>
                <div>{message.text}</div>
              </div>
            ))
        ) : (
          <div className="defaultMessage">It's kind of quiet here... </div>
        )}
      </div>

      <Input
        inverted
        id="message"
        onKeyDown={handleKeyDown}
        placeholder={`Message @${roomStore.selectedRoom?.name}`}
        action={{
          color: "purple",
          labelPosition: "right",
          content: "Send",
          icon: { name: "envelope" },
          onClick: () => handleSend(),
        }}
      />
    </>
  );
};

export default observer(SelectedRoom);
