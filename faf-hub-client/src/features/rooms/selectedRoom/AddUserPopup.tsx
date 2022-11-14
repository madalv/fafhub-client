import React from 'react'
import {Header, Button, Popup, Grid, Segment, Input} from 'semantic-ui-react';
import {observer} from "mobx-react-lite";
import {store, useStore} from "../../../app/stores/store";
import {User} from "../../../app/models/User";


const handleAddUser = () => {
    // let ws = store.wsStore.ws
    // const input = document.getElementById("emailInput") as HTMLInputElement
    //
    //
    // if (input.value != null && input.value != "") {
    //
    //     let email = input.value
    //     store.userStore.getByEmail(email).then(user => {
    //         ws!!.send(JSON.stringify({
    //             "text": "anything",
    //             "command": "AddUser",
    //             "targetId": user.id,
    //             "roomId": store.roomStore.selectedRoom?.id}))
    //         input.value = ""
    //     })
    //
    // }
}

const AddUserPopup: React.FC = () => {
    const {roomStore} = useStore()
    return (
        <Popup trigger={<Button inverted>Add User</Button>} flowing hoverable inverted>
                <Input id="emailInput" placeholder='Enter user email' action={{
                    content: "Add",
                    inverted: true,
                    onClick:(() => handleAddUser())
                }}/>
        </Popup>
    )
}


export default observer(AddUserPopup)