import { useNavigate } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import "./styles.css";
export default function UserInfo() {
  const { userStore } = useStore();
  const navigate = useNavigate();

  return (
    <div className="userInfoContainer">
      <Button
        className="roomButton"
        id="logoutButton"
        onClick={() => {
          userStore.logout();
          navigate("/");
        }}
      >
        Logout
      </Button>
      <Image
        className="avatarImage"
        avatar
        size="huge"
        // src="/assets/user_placeholder.png"
        src={userStore.user?.avatarUri}
      />
      <div className="nameContainer">
        <div>{userStore.user?.lastName}</div>
        <div>{userStore.user?.firstName}</div>
      </div>
    </div>
  );
}
