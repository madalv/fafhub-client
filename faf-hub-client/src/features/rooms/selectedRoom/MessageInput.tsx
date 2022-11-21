import { Input } from "semantic-ui-react";
import React from "react";
import { store, useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

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

const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  if (event.key === "Enter") {
    handleSend();
  }
};

const MessageInput: React.FC = () => {
  const { roomStore } = useStore();

  return (
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
  );
};

export default observer(MessageInput);
