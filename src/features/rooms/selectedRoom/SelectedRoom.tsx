import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import "./styles.css";
import AddUserPopup from "./AddUserPopup";
import { Image } from "semantic-ui-react";

const SelectedRoom: React.FC = () => {
  const { roomStore, wsStore, userStore } = useStore();

  // todo move this somewhere else
  useEffect(() => {
    wsStore.ws!!.onmessage = (event) => {
      let msg = JSON.parse(event.data);
      console.log(msg);

      // todo room.messages is undefined
      switch (msg.command) {
        case "CreateMessage":
          roomStore.addNewMessageToRoom(roomStore.selectedRoom!!.id, msg);
          break;
        case "AddUser":
          roomStore.loadRooms().then(() => {
            roomStore.setSelectedRoom(msg.roomId);
            roomStore.loadUsersForRoom(roomStore.selectedRoom!!).then();
            roomStore.addNewMessageToRoom(roomStore.selectedRoom!!.id, msg);
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
  }, [roomStore, wsStore.ws]);

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
        <div className="messagesContainer">
          {roomStore.selectedRoom?.messages ? (
            roomStore.selectedRoom?.messages
              .slice()
              .reverse()
              .map((message, index, array) => (
                <div className="messageWrapper" key={message.id}>
                  <div className="dateContainer">
                    {(() => {
                      let date = new Date(message.createdAt);
                      let previousDate =
                        index > 0 ? new Date(array[index - 1].createdAt) : null;
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
                            <div
                              className={`messageTextWrapper ${
                                user?.id === userStore.user?.id ? "isOwner" : ""
                              }`}
                            >
                              {message.text}
                            </div>

                            <span className="time">
                              {date.toLocaleString("en-US", {
                                minute: "2-digit",
                                hour: "2-digit",
                              })}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="defaultMessage">It's kind of quiet here... </div>
          )}
        </div>
      </div>
    </>
  );
};

export default observer(SelectedRoom);
