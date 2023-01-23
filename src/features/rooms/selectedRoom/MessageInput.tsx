import {Icon, Input, Message} from "semantic-ui-react";
import React from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import {handleKeyDown, handleSend, MSG_SPAM_TIMEOUT} from "./messageInputLogic";



const MessageInput: React.FC = () => {
  const { roomStore } = useStore();

  return (
      <>
          <Message
              negative
              hidden={roomStore.canSendMsg}
              >
              <Icon name='circle notched' loading />
              <Message.Header style={{"backgroundColor": "inherit"}}>
                  {`You've been sending too many messages. Try again in ${MSG_SPAM_TIMEOUT / 1000} sec.`}
              </Message.Header>
          </Message>
          <Input
              inverted
              id="message"
              onKeyDown={handleKeyDown}
              placeholder={`Message @${roomStore.selectedRoom?.name}`}
              action={{
                  icon: { name: "paper plane outline", size: "large", id: "sendIcon" },
                  onClick: () => handleSend(),
              }}
          />
      </>

  );
};

export default observer(MessageInput);
