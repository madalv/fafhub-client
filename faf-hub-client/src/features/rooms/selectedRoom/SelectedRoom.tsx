import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import "./styles.css";
import { Message } from "../../../app/models/Message";
import AddUserPopup from "./AddUserPopup";
import CreateRoom from "../roomCreationForm/CreateRoom";


const SelectedRoom: React.FC = () => {
  const { roomStore, wsStore, userStore} = useStore();

  // todo move this somewhere else
  useEffect(() => {

    wsStore.ws!!.onmessage = (event) => {
      let msg = JSON.parse(event.data) as Message;
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
  }, [roomStore]);

  return (
      <>
        <h3>
          <b className="defaultMessage">{roomStore.selectedRoom?.name}</b>
        </h3>

        {roomStore.selectedRoom?.ownerId === userStore.user?.id ? (
            <AddUserPopup />
        ) : (
            <></>
        )}

        <div className="messageList">
          {roomStore.selectedRoom?.messages ? (
              roomStore.selectedRoom?.messages
                  .slice()
                  .reverse()
                  .map((message, index, array) => (
                      <div key={message.id} className="message">

                        {/*todo aranjeaza cumva normal huineaua asta pls*/}
                        {(() => {
                          let user = userStore.getUserInfo(message.userId!!)
                          let date = new Date(message.createdAt);
                          let previousDate =
                              index > 0 ? new Date(array[index - 1].createdAt) : null;
                          return previousDate?.toLocaleDateString("en-GB") !==
                          date.toLocaleDateString("en-GB") ? (
                              <>
                                <div className="dateContainer">
                                  <hr className="line" />
                                  <span className="date">
                          {date.toLocaleDateString("en-GB")}
                        </span>
                                  <hr className="rightLine" />
                                </div>
                                <span>{user === undefined ? "unknown": `${user?.firstName} ${user?.lastName} @ `}</span>
                                <span className="time">
                        {date.toLocaleString("en-US", {
                          minute: "2-digit",
                          hour: "2-digit",
                        })}
                      </span>
                              </>
                          ) : (
                              <div className="time">
                                <span>{user === undefined ? "unknown": `${user?.firstName} ${user?.lastName} @ `}</span>
                                {date.toLocaleString("en-US", {
                                  minute: "2-digit",
                                  hour: "2-digit",
                                })}
                              </div>
                          );
                        })()}

                        <div>{message.text} </div>
                      </div>
                  ))
          ) : (
              <div className="defaultMessage">It's kind of quiet here... </div>
          )}
        </div>
      </>
  );
};

export default observer(SelectedRoom);
