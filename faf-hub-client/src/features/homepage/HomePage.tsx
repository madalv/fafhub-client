import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import "./styles.css";
import SendOTPForm from "../register/SendOTPForm";
import LoginFormOTP from "../login/LoginFormOTP";
import RegisterFormOTP from "../register/RegisterFormOTP";

export default observer(function HomePage() {
    const { userStore, modalStore} = useStore();

  return (
    <div className="homePageContainer">
      <div className="logoContainer">
        <Image
          className="logo"
          src="/assets/faf.png"
          size="massive"
          style={{ marginBottom: 0 }}
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
                onClick={() => modalStore.openModal(<SendOTPForm key={null} type={undefined} props={<LoginFormOTP/>} />)}
                size="huge"
                inverted
              >
                Login
              </Button>
              <Button
                onClick={() => modalStore.openModal(<SendOTPForm key={null} type={undefined} props={<RegisterFormOTP/>} />)}
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
