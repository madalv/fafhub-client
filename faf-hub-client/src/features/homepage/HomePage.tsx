import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../login/LoginForm";
import RegisterForm from "../register/RegisterForm";
import "./styles.css";
export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <div className="homePageContainer">
      <div className="logoContainer">
        <Image
          className="logo"
          src="/assets/faf.png"
          size="massive"
          style={{ marginBottom: 12 }}
        />
        <div className="loginRegisterContainer">
          {userStore.isLoggedIn ? (
            <>
              <Button as={Link} to="/rooms" size="huge" inverted>
                Go To Rooms!
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => modalStore.openModal(<LoginForm />)}
                size="huge"
                inverted
              >
                Login
              </Button>
              <Button
                onClick={() => modalStore.openModal(<RegisterForm />)}
                size="huge"
                inverted
              >
                Register!
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
