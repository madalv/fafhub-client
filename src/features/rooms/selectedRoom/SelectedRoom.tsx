import React, { Component, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import "./styles.css";
import AddUserPopup from "./AddUserPopup";
import { Button, Icon, Image, Popup, PopupProps } from "semantic-ui-react";
import { useRef } from "react";

const SelectedRoom: React.FC = () => {
  const [canClose, setCanClose] = useState(false);
  const handleClose = () => {
    setCanClose(true);
  };
  const scrollBottom = () => {
    const messagesContainer = document.querySelector("#messagesContainer");
    messagesContainer?.scrollTo({
      top: Number.MAX_SAFE_INTEGER,
      left: 0,
      behavior: "smooth",
    });
    setPopUp(false);
  };
<<<<<<< HEAD:src/features/rooms/selectedRoom/SelectedRoom.tsx

=======
  const initialPopup = useRef<Component<PopupProps> | any>();
>>>>>>> eb36502 (Beauty):faf-hub-client/src/features/rooms/selectedRoom/SelectedRoom.tsx
  const { roomStore, wsStore, userStore } = useStore();
  const [isPopUp, setPopUp] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    wsStore.ws!!.onmessage = (event) => {
      let msg = JSON.parse(event.data);

      // todo room.messages is undefined
      switch (msg.command) {
        case "CreateMessage": {
<<<<<<< HEAD:src/features/rooms/selectedRoom/SelectedRoom.tsx
          if (msg.roomId !== roomStore.selectedRoom?.id) roomStore.setNotifs(msg.roomId)
=======
          if (msg.roomId != roomStore.selectedRoom?.id)
            roomStore.setNotifs(msg.roomId);
>>>>>>> eb36502 (Beauty):faf-hub-client/src/features/rooms/selectedRoom/SelectedRoom.tsx
          else roomStore.addNewMessageToRoom(msg.roomId, msg);
          break;
        }
        case "AddUser":
<<<<<<< HEAD:src/features/rooms/selectedRoom/SelectedRoom.tsx
          roomStore.loadRooms().then()
=======
          roomStore.loadRooms().then(() => {
            roomStore.setSelectedRoom(msg.roomId).then(() => {
              roomStore.loadUsersForRoom(roomStore.selectedRoom!!).then();
              roomStore.addNewMessageToRoom(roomStore.selectedRoom!!.id, msg);
            });
          });

>>>>>>> eb36502 (Beauty):faf-hub-client/src/features/rooms/selectedRoom/SelectedRoom.tsx
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
    if (
      lastMessage === undefined ||
      lastMessage.classList.contains("defaultMessage")
    )
      return;
    if (lastMessage.dataset.author === userStore.user?.id) {
      scrollBottom();
    } else if (messagesContainer?.scrollTop! < 0 && !isPopUp) {
      setPopUp(true);
    }
  }, [roomStore.selectedRoom?.messages]);
  return (
    <>
      <div className="roomToolBar">
        <div className="roomToolBar__hero">
          {window.location.pathname === "/rooms" ? (
            <h3 className="banner">
              <b className="defaultMessage">{roomStore.selectedRoom?.name}</b>
            </h3>
          ) : (
            <></>
          )}

          {window.location.pathname === "/rooms" && (
            <div className="toolBar__icon">
              <Popup
                ref={initialPopup}
                id="ellipsisPopup"
                closeOnDocumentClick={canClose}
                trigger={<Icon size="large" name="ellipsis vertical" />}
                basic
                on="click"
                position="bottom right"
              >
                <ul className="toolBar__options">
                  <Popup
                    id="innerPopup"
                    trigger={<li>Add User</li>}
                    closeOnDocumentClick={true}
                    on="click"
                    basic
                    onClose={handleClose}
                    positionFixed
                    onOpen={() => setCanClose(false)}
                  >
                    <AddUserPopup />
                  </Popup>

                  <li>Rename</li>
                  <li>Leave</li>
                  <li>Delete</li>
                </ul>
              </Popup>
            </div>
          )}
        </div>

        {/* {roomStore.selectedRoom?.ownerId === userStore.user?.id ? (
          <AddUserPopup />
        ) : (
          <></>
        )} */}
      </div>

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
                      <div
                        className="message__hero"
                        onMouseOver={(e) => {
                          [
                            ...e.currentTarget.querySelectorAll<HTMLElement>(
                              ".messageAction__icon"
                            ),
                          ].map((m) => {
                            m.setAttribute("style", "display:inline-block");
                          });
                        }}
                        onMouseOut={(e) => {
                          [
                            ...e.currentTarget.querySelectorAll<HTMLElement>(
                              ".messageAction__icon"
                            ),
                          ].map((m) => {
                            m.setAttribute("style", "display:none");
                          });
                        }}
                      >
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
                                <div className="actionIcons__container">
                                  <Icon
                                    className="messageAction__icon"
                                    size="small"
                                    id="editIcon"
                                    name="edit outline"
                                  />
                                  <Icon
                                    className="messageAction__icon"
                                    size="small"
                                    id="deleteIcon"
                                    name="delete"
                                  />
                                </div>
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
