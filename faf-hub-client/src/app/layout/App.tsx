import React, {useEffect, useState} from "react";
import {Room} from "../models/Room";
import {List} from "semantic-ui-react";
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";
import { agent } from "../api/agent"


const App: React.FC = () => {
    const {roomStore} = useStore()
    const [rooms, setRooms] = useState<Room[]>([])

    useEffect(() => {
        agent.Rooms.list()
            .then((response) => {
                setRooms(response)
            })
    }, [])

    return (
        <>
            <List>
                {rooms.map((room) => (
                    <List.Item key={room.id}>
                        {room.name}: {room.ownerId}
                    </List.Item>
                ))}
            </List>
        </>
    )
}

export default observer(App);

