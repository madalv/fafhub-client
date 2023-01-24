import {observer} from "mobx-react-lite";
import React from "react";
import {Input} from "semantic-ui-react";
import {handleSend} from "./messageInputLogic";
import {store, useStore} from "../../../app/stores/store";

export interface EditMsgInterface {
    msgId: string,
    oldText: string
}

const EditMessage = ({msgId, oldText} : EditMsgInterface): JSX.Element => {
    const {roomStore} = useStore()

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            handleSend("UpdateMessage", "editInput", msgId);
            store.modalStore.closeModal()
        }
    };

    return (
        <>
            <p>Fix your mistakes, human:</p>
            <Input fluid
                defaultValue={oldText}
                id="editInput"
                onKeyDown={handleKeyDown}
                action={{
                    icon: { name: "edit outline", size: "large", id: "sendIcon"},
                    onClick: () => {
                        handleSend("UpdateMessage", "editInput", msgId)
                        store.modalStore.closeModal()
                    },
                }}
            />
        </>

    )
}
export default observer(EditMessage)