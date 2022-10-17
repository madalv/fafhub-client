import {observer} from "mobx-react-lite";
import React from "react";
import {Link} from "react-router-dom";


const NavBar: React.FC = () => {
    return(
        <>
            <Link to="/">HomePage</Link>
            <Link to="/rooms">Rooms</Link>
        </>
    )
}



export default observer(NavBar)