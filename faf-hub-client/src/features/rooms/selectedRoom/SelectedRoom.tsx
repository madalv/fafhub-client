import React, {useEffect} from 'react'
import {observer} from "mobx-react-lite";
import {store, useStore} from "../../../app/stores/store";

// TODO connect to different ws when logging in
// log out -> log in -> send message won't work rn (without refreshing to reconnect)

// TODO fix thing that it won't automatically add the message if room is newly created unless refreshed
let ws = new WebSocket(`${process.env.REACT_APP_WS_URL}/?token=${store.commonStore.token}`)

const handleSend = (roomId: string) => {
    const input = document.getElementById("message") as HTMLInputElement
    // console.log(input.value)
    // console.log(JSON.stringify({"text": input.nodeValue, "command": "CreateMessage", "targetId": roomId, "roomId": roomId}))
    if (input.value != null) {
        ws.send(JSON.stringify({"text": input.value, "command": "CreateMessage", "targetId": roomId, "roomId": roomId}))
    }
}

const SelectedRoom: React.FC = () => {
    const {roomStore, commonStore} = useStore();

    useEffect(() => {
        ws.onmessage = (event) => {
            console.log(event.data)
            roomStore.addNewMessageToRoom(roomStore.selectedRoom!!.id, JSON.parse(event.data))
        }
    }, [roomStore, commonStore])

    return (
        <>
            <h3><b>{roomStore.selectedRoom?.name}</b></h3>

            {roomStore.selectedRoom?.messages ? roomStore.selectedRoom?.messages.slice().reverse().map((message) => (
                <div key={message.id}>
                    <b>{message.user?.email} {message.createdAt}</b>
                    <div>
                        {message.text}
                    </div>
                </div>
            )) : <div>It's kind of quiet here... </div>}

            <div className="ui icon input">
                <input id="message" type="text" placeholder="Write something nice..."/>
                <i className="envelope outline link icon" onClick={() => {handleSend(roomStore.selectedRoom!!.id)}}></i>
            </div>
        </>
    )
}

export default observer(SelectedRoom)