import {Icon, Input, Label, Message, Popup} from "semantic-ui-react";
import React from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { handleSend, MAX_MSG_LEN, MSG_SPAM_TIMEOUT} from "./messageInputLogic";


const MessageInput: React.FC = () => {
  const { roomStore } = useStore();
  const [count, setCount] = React.useState(0);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            handleSend("CreateMessage", "message");
            setCount(0)
        }
    };

  // @ts-ignore
    return (
      <>
          <Message
              negative
              hidden={roomStore.canSendMsg}>
              <Icon name='circle notched' loading />
              <Message.Header style={{"backgroundColor": "inherit"}}>
                  {`You've been sending too many messages. Try again in ${MSG_SPAM_TIMEOUT / 1000} sec.`}
              </Message.Header>
          </Message>

          <Message
              negative
              hidden={count <= MAX_MSG_LEN}>
              <Icon name='plus' loading />
              <Message.Header style={{"backgroundColor": "inherit"}}>
                  {`Max message length reached, cannot send message.`}
              </Message.Header>
          </Message>

          <Popup
          on="click"
          position="top right"
          inverted
          trigger={
              <Input
                  inverted
                  id="message"
                  onKeyDown={handleKeyDown}
                  onChange={e => setCount(e.target.value.length)}
                  placeholder={`Message @${roomStore.selectedRoom?.name}`}
                  action={{
                      icon: { name: "paper plane outline", size: "large", id: "sendIcon"},
                      onClick: () => {
                          setCount(0)
                          handleSend("CreateMessage", "message")
                      },
                  }}
              />
          }>
              {count}/500
          </Popup>

      </>

  );
};

export default observer(MessageInput);
