import React, { Component, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { store, useStore } from "../../../app/stores/store";
import "./styles.css";
import { Button, Icon, Image, Popup, PopupProps } from "semantic-ui-react";
import { useRef } from "react";
import RoomRenameForm from "../roomRenameForm/RoomRenameForm";
import AddUserPopup from "./AddUserPopup";
import EditMessage from "./EditMessage";

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
<<<<<<< HEAD:src/features/rooms/selectedRoom/SelectedRoom.tsx
<<<<<<< HEAD:src/features/rooms/selectedRoom/SelectedRoom.tsx
>>>>>>> eb36502 (Beauty):faf-hub-client/src/features/rooms/selectedRoom/SelectedRoom.tsx
  const { roomStore, wsStore, userStore } = useStore();
=======
  const { roomStore, wsStore, userStore, modalStore} = useStore();
>>>>>>> 3ab8317 (functionality for 3 dots stuff):faf-hub-client/src/features/rooms/selectedRoom/SelectedRoom.tsx
=======
  const { roomStore, wsStore, userStore, modalStore } = useStore();
>>>>>>> 1a9f62b (mini fix):faf-hub-client/src/features/rooms/selectedRoom/SelectedRoom.tsx
  const [isPopUp, setPopUp] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (roomStore.selectedRoom === null) {
      roomStore.loadRooms().then(() =>{
        roomStore.setSelectedRoom(roomStore.selectedRoomId!).then()
      })
    }
  }, [roomStore.selectedRoom])

  useEffect(() => {
    wsStore.ws!!.onmessage = (event) => {
      let msg = JSON.parse(event.data);

      switch (msg.command) {
        case "CreateMessage": {
<<<<<<< HEAD:src/features/rooms/selectedRoom/SelectedRoom.tsx
<<<<<<< HEAD:src/features/rooms/selectedRoom/SelectedRoom.tsx
          if (msg.roomId !== roomStore.selectedRoom?.id) roomStore.setNotifs(msg.roomId)
=======
          if (msg.roomId != roomStore.selectedRoom?.id)
=======
          if (msg.roomId !== roomStore.selectedRoom?.id)
>>>>>>> 1a9f62b (mini fix):faf-hub-client/src/features/rooms/selectedRoom/SelectedRoom.tsx
            roomStore.setNotifs(msg.roomId);
<<<<<<< HEAD:src/features/rooms/selectedRoom/SelectedRoom.tsx
>>>>>>> eb36502 (Beauty):faf-hub-client/src/features/rooms/selectedRoom/SelectedRoom.tsx
          else roomStore.addNewMessageToRoom(msg.roomId, msg);
=======
          else roomStore.addMessageToSelectedRoom(msg)
>>>>>>> 5d2a175 (legendary bug fix??):faf-hub-client/src/features/rooms/selectedRoom/SelectedRoom.tsx
          break;
        }
        case "DeleteMessage":
          roomStore.deleteMessageFromSelectedRoom(msg.targetId);
          break;
        case "UpdateMessage":
<<<<<<< HEAD:src/features/rooms/selectedRoom/SelectedRoom.tsx
          roomStore.editMessageFromSelectedRoom(msg.targetId, msg.text)
          break;
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
=======
          roomStore.editMessageFromSelectedRoom(msg.targetId, msg.text);
>>>>>>> 1a9f62b (mini fix):faf-hub-client/src/features/rooms/selectedRoom/SelectedRoom.tsx
          break;
        case "DeleteRoom":
          roomStore.loadRooms().then(() => {
            store.roomStore.setSelectedRoom(roomStore.rooms[0].id);
          });
          break;
        case "RemoveUser":
          {
            if (msg.targetId === userStore.user?.id)
              roomStore.loadRooms().then(() => {
                store.roomStore.setSelectedRoom(roomStore.rooms[0].id);
              });
            else {
              roomStore.setSelectedRoom(roomStore.selectedRoom!.id);
            }
          }
          break;
        case "AddUser":
        case "CreateRoom":
        case "UpdateRoom":
          roomStore.loadRooms().then(() => {
            if (msg.roomId !== roomStore.selectedRoom?.id)
              roomStore.setNotifs(msg.roomId);
            else
              roomStore
                .setSelectedRoom(msg.roomId)
                .then(() =>
                  roomStore.addNewMessageToRoom(
                    roomStore.selectedRoom!!.id,
                    msg
                  )
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
                  {roomStore.selectedRoom?.ownerId === userStore.user?.id ? (
                    <>
                      <li
                        onClick={() => modalStore.openModal(<AddUserPopup />)}
                      >
                        Add User
                      </li>
                      <li
                        onClick={() => modalStore.openModal(<RoomRenameForm />)}
                      >
                        Rename
                      </li>
                      <li
                        onClick={() =>
                          roomStore.delete(roomStore.selectedRoom!!.id)
                        }
                      >
                        Delete{" "}
                      </li>
                    </>
                  ) : (
                    <li
                      onClick={() =>
                        roomStore.removeUser(
                          roomStore.selectedRoom!.id,
                          userStore.user!.id
                        )
                      }
                    >
                      Leave
                    </li>
                  )}
                </ul>
              </Popup>
            </div>
          )}
        </div>
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
                                {message.userId === userStore.user!.id &&
                                message.command !== "DeleteMessage" ? (
                                  <div className="actionIcons__container">
                                    <Icon
                                      link
                                      onClick={() =>
                                        store.modalStore.openModal(
                                          <EditMessage
                                            msgId={message.id}
                                            oldText={message.text}
                                          />
                                        )
                                      }
                                      className="messageAction__icon"
                                      size="small"
                                      id="editIcon"
                                      name="edit outline"
                                    />
                                    <Icon
                                      link
                                      onClick={() =>
                                        handleDeleteMessage(message.id)
                                      }
                                      className="messageAction__icon"
                                      size="small"
                                      id="deleteIcon"
                                      name="delete"
                                    />
                                  </div>
                                ) : null}

                                <div
                                  className={`messageTextWrapper ${
                                    user?.id === userStore.user?.id
                                      ? "isOwner"
                                      : ""
                                  }`}
                                >
                                  {message.command === "DeleteMessage" ? (
                                    <i>Message deleted</i>
                                  ) : (
                                    message.text
                                  )}
                                  {message.command === "UpdateMessage" ? (
                                    <i> {` (edited)`}</i>
                                  ) : null}
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

const handleDeleteMessage = (msgId: string) => {
  let ws = store.wsStore.ws;
  ws!!.send(
    JSON.stringify({
      text: "anything",
      command: "DeleteMessage",
      targetId: msgId,
      roomId: store.roomStore.selectedRoom?.id,
    })
  );
};

export default observer(SelectedRoom);
