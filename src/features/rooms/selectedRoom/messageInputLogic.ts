import {store} from "../../../app/stores/store";
import React from "react";

export const MSG_SPAM_TIMEOUT: number = 30000
const MSG_COUNTER_LIMIT: number = 8
const MSG_COUNTER_INTERVAL: number = 5000

setInterval(() => checkLimit(), MSG_COUNTER_INTERVAL)
setTimeout(() => {
    store.roomStore.setCanSendMsg(true)
}, MSG_SPAM_TIMEOUT)

export const checkLimit = () => {
    let msgCounter = store.roomStore.msgCounter
    if (msgCounter >= MSG_COUNTER_LIMIT) {
        store.roomStore.setCanSendMsg(false)
        setTimeout(() => {
            store.roomStore.setCanSendMsg(true)
        }, MSG_SPAM_TIMEOUT)
    }

    store.roomStore.resetMsgCounter()
}

export const handleSend = () => {
    let ws = store.wsStore.ws;

    const input = document.getElementById("message") as HTMLInputElement;
    if (store.roomStore.canSendMsg
        && input.value != null
        && input.value !== "") {
        ws!!.send(
            JSON.stringify({
                text: input.value,
                command: "CreateMessage",
                targetId: store.roomStore.selectedRoom?.id,
                roomId: store.roomStore.selectedRoom?.id,
            })
        );
        input.value = "";
        store.roomStore.incMsgCounter()
    } else console.log("cant send rn")
};

export const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
        handleSend();
    }
};