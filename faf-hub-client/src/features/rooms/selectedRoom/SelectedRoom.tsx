import React, {useEffect} from 'react'
import {observer} from "mobx-react-lite";
import {store, useStore} from "../../../app/stores/store";
import "./styles.css";
import {Message} from "../../../app/models/Message";
import {Button, Input} from "semantic-ui-react";
import AddUserPopup from "./AddUserPopup";

// TODO refactor

// TODO fix message duplication after logout -> login
// login 3 times, message is duplicated 3 times, even w diff accounts

// TODO validate message
const handleSend = () => {
    let ws = store.wsStore.ws
    const input = document.getElementById("message") as HTMLInputElement
    if (input.value != null && input.value != "") {
        ws!!.send(JSON.stringify({"text": input.value, "command": "CreateMessage",
            "targetId": store.roomStore.selectedRoom?.id, "roomId": store.roomStore.selectedRoom?.id}))
        input.value = ""
    }
}


const handleKeyDown = (event : React.KeyboardEvent<HTMLDivElement>)  => {
    if (event.key == 'Enter') {
        handleSend()
    }
}

const SelectedRoom: React.FC = () => {
    const {roomStore, commonStore, wsStore} = useStore();

    useEffect(() => {
        wsStore.ws!!.onmessage = (event) => {
            let msg =  JSON.parse(event.data) as Message
            if (msg.command === "CreateMessage") {
                roomStore.addNewMessageToRoom(roomStore.selectedRoom!!.id, msg)
            }
        }

    }, [commonStore, wsStore, roomStore])

    return (
        <>
            <h3><b>{roomStore.selectedRoom?.name}</b></h3>

            <AddUserPopup></AddUserPopup>

            <div className="messageList">
                {roomStore.selectedRoom?.messages ? roomStore.selectedRoom?.messages.slice().reverse().map((message) => (
                    <div key={message.id}  className="message">
                        <b>{message.userId} {message.createdAt}</b>
                        <div>
                            {message.text}
                        </div>
                    </div>
                )) : <div>It's kind of quiet here... </div>}
            </div>


            <Input inverted id="message" onKeyDown={handleKeyDown}
                   placeholder={`Message @${roomStore.selectedRoom?.name}`}
                action={{
                    color: "purple",
                    labelPosition: "right",
                    content: "Send",
                    icon: {name: "envelope"},
                    onClick: (() => handleSend())
                }}

            />
        </>
    )
}

export default observer(SelectedRoom)