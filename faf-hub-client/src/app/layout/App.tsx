import React, {useEffect, useState} from "react";
import axios from "axios";
import {Room} from "../models/Room";
import {List} from "semantic-ui-react";


const App: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([])

    useEffect(() => {
        axios.get<Room[]>("http://localhost:8080/api/rooms")
            .then((response) => {
                setRooms(response.data)
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

export default App;

