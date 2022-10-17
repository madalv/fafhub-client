<<<<<<< HEAD
import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Navigate, redirect, Route, Routes} from "react-router-dom";
import HomePage from "../../features/homepage/HomePage";
import RoomDashboard from "../../features/room-dashboard/RoomDashboard";
import LoginForm from "../../features/login/LoginForm";
import {useStore} from "../stores/store";
import roomDashboard from "../../features/room-dashboard/RoomDashboard";
import PageBar from "./PageBar";
import NavBar from "./NavBar";
import RegisterForm from "../../features/register/RegisterForm";


const App: React.FC = () => {

    const {userStore, commonStore} = useStore()

    useEffect(() => {
        if (commonStore.token) {
            userStore.setUser().finally()
        }
    }, [commonStore, userStore])

    console.log(userStore.user?.email)
    console.log(commonStore.token)

    return (
        <>

            <PageBar/>
            <NavBar/>
            <Routes>
                <Route path='/'  element={ <HomePage/>}/>
                <Route path='/rooms' element={userStore.isLoggedIn() ? <RoomDashboard/> : <Navigate replace to="/login" />}/>
                <Route path='/login' element={<LoginForm/>}/>
                <Route path='/register' element={<RegisterForm/>}/>
=======
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
>>>>>>> main
            </Routes>
        </>
    )
}

export default observer(App);

