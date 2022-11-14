import "./styles.css";
import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import { Image, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";


const NavBar: React.FC = () => {
  const { userStore } = useStore();
  return (
    <>
      {userStore.isLoggedIn && (
        <div className="container">
          <div className="aside">
            <Image src="/assets/faf.png" />
            <Menu vertical inverted fluid>
              <Menu.Item as={NavLink} to="/" className="menuItem" name="main">
                Main
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                to="/community"
                className="menuItem"
                name="community"
              >
                Community
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                to="/chats"
                className="menuItem"
                name="chats"
              >
                Chats
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                to="/rooms"
                className="menuItem"
                name="rooms"
              >
                Rooms
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                to="/files"
                className="menuItem"
                name="files"
              >
                Files
              </Menu.Item>
            </Menu>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(NavBar);
