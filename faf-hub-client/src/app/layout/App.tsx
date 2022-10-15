import React from "react";
import {observer} from "mobx-react-lite";
import {Route, Routes} from "react-router-dom";
import MainDashboard from "../../features/main-dashboard/MainDashboard";
import RoomDashboard from "../../features/room-dashboard/RoomDashboard";
import LoginForm from "../../features/login/LoginForm";

// TODO create navbar

const App: React.FC = () => {

    return (
        <>
            <Routes>
                <Route path='/' element={<MainDashboard/>}/>
                <Route path='/rooms' element={<RoomDashboard/>}/>
                <Route path='/login' element={<LoginForm/>}/>
            </Routes>
        </>
    )
}

export default observer(App);

