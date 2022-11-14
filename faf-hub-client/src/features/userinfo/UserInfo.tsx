import { Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import "./styles.css";
export default function UserInfo() {
  const { userStore } = useStore();
  return (
    <div className="userInfoContainer">
      <Image
        className="avatarImage"
        avatar
        src="/assets/user_placeholder.png"
      />
      <div className="nameContainer">
          <div>{userStore.user?.id}</div>
          <div>{userStore.user?.lastName}</div>
          <div>{userStore.user?.firstName}</div>

      </div>
    </div>
  );
}
