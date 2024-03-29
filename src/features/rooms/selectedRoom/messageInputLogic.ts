import {store} from "../../../app/stores/store";
import React from "react";

export const MSG_SPAM_TIMEOUT: number = 30000
const MSG_COUNTER_LIMIT: number = 8
const MSG_COUNTER_INTERVAL: number = 5000
export const MAX_MSG_LEN = 500

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

export const handleSend = (command: string, inputId: string, msgId?: string) => {
    let ws = store.wsStore.ws;

    const input = document.getElementById(inputId) as HTMLInputElement;
    if (store.roomStore.canSendMsg
        && input.value != null
        && input.value !== ""
        && input.value.length <= MAX_MSG_LEN) {
        ws!!.send(
            JSON.stringify({
                text: input.value,
                command: command,
                targetId: msgId ? msgId : store.roomStore.selectedRoom?.id,
                roomId: store.roomStore.selectedRoom?.id,
            })
        );
        input.value = "";
        store.roomStore.incMsgCounter()
    }
};
