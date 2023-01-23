import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import "./styles.css";
import AddUserPopup from "./AddUserPopup";
import { Button, Image } from "semantic-ui-react";

const SelectedRoom: React.FC = () => {
  const scrollBottom = () => {
    const messagesContainer = document.querySelector("#messagesContainer");
    messagesContainer?.scrollTo({
      top: Number.MAX_SAFE_INTEGER,
      left: 0,
      behavior: "smooth",
    });
    setPopUp(false);
  };
  const { roomStore, wsStore, userStore } = useStore();
  const [isPopUp, setPopUp] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  // todo move this somewhere else
  useEffect(() => {
    wsStore.ws!!.onmessage = (event) => {
      let msg = JSON.parse(event.data);
      console.log(msg);

      // todo room.messages is undefined
      switch (msg.command) {
        case "CreateMessage": {
          if (msg.roomId != roomStore.selectedRoom?.id) roomStore.setNotifs(msg.roomId)
          else roomStore.addNewMessageToRoom(msg.roomId, msg);
          break;
        }
        case "AddUser":
          roomStore.loadRooms().then(() => {
            roomStore.setSelectedRoom(msg.roomId).then(() => {
              roomStore.loadUsersForRoom(roomStore.selectedRoom!!).then();
              roomStore.addNewMessageToRoom(roomStore.selectedRoom!!.id, msg);
            })

          });

          break;
        case "DeleteRoom":
          roomStore.loadRooms().then();
          break;
        case "RemoveUser":
          break;
        case "CreateRoom":
          roomStore.loadRooms().then(() => {
            roomStore
              .setSelectedRoom(msg.roomId)
              .then(() =>
                roomStore.addNewMessageToRoom(roomStore.selectedRoom!!.id, msg)
              );
          });
          break;
      }
    };
  }, [roomStore]);

  useEffect(() => {
    const antiReverseContainer = document.querySelector("#antiReverse");
    const messagesContainer = document.querySelector("#messagesContainer");
    const lastMessage = antiReverseContainer?.children[
      antiReverseContainer.childElementCount - 1
    ] as HTMLElement;
    if (lastMessage.dataset.author === userStore.user?.id) {
      scrollBottom();
    } else if (messagesContainer?.scrollTop! < 0 && !isPopUp) {
      setPopUp(true);
    }
  }, [roomStore.selectedRoom?.messages]);
  return (
    <>
      {window.location.pathname === "/rooms" ? (
        <h3>
          <b className="defaultMessage">{roomStore.selectedRoom?.name}</b>
        </h3>
      ) : (
        <></>
      )}
      {roomStore.selectedRoom?.ownerId === userStore.user?.id ? (
        <AddUserPopup />
      ) : (
        <></>
      )}

      <div className="messageList">
        <div
          className="messagesContainer"
          id="messagesContainer"
          onScroll={(event) => {
            setScrollPosition(event.currentTarget.scrollTop);
            if (scrollPosition >= 0) setPopUp(false);
          }}
        >
          <div className="antiReverse" id="antiReverse">
            {roomStore.selectedRoom?.messages ? (
              roomStore.selectedRoom?.messages
                .slice()
                .reverse()
                .map((message, index, array) => (
                  <div
                    data-author={message.userId}
                    className="messageWrapper"
                    key={message.id}
                  >
                    <div className="dateContainer">
                      {(() => {
                        let date = new Date(message.createdAt);
                        let previousDate =
                          index > 0
                            ? new Date(array[index - 1].createdAt)
                            : null;
                        return (
                          previousDate?.toLocaleDateString("en-GB") !==
                            date.toLocaleDateString("en-GB") && (
                            <>
                              <hr className="line" />
                              <span className="date">
                                {date.toLocaleDateString("en-GB")}
                              </span>
                              <hr className="rightLine" />
                            </>
                          )
                        );
                      })()}
                    </div>
                    <div className="message">
                      <Image
                        className="avatarImage"
                        avatar
                        size="huge"
                        // src="/assets/user_placeholder.png"
                        src={userStore.getUserInfo(message.userId!)?.avatarUri}
                      />
                      <div className="message__hero">
                        {(() => {
                          let user = userStore.getUserInfo(message.userId!!);
                          let date = new Date(message.createdAt);
                          return (
                            <>
                              <div className="nameContainer yellow">
                                <b>
                                  {user === undefined
                                    ? "unknown"
                                    : `${user?.firstName} ${user?.lastName} `}
                                </b>
                              </div>
                              <div className="messageTimeWrapper">
                                <div
                                  className={`messageTextWrapper ${
                                    user?.id === userStore.user?.id
                                      ? "isOwner"
                                      : ""
                                  }`}
                                >
                                  {message.text}
                                </div>
                                <div className="time">
                                  {date.toLocaleString("en-US", {
                                    minute: "2-digit",
                                    hour: "2-digit",
                                  })}
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <Button className="defaultMessage">
                It's kind of quiet here...
              </Button>
            )}
            {isPopUp && scrollPosition < 0 && (
              <div
                onClick={scrollBottom}
                className="newMessagePopUp"
                id="newMessagePopUp"
              >
                New Message
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(SelectedRoom);
