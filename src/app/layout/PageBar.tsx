import { observer } from "mobx-react-lite";
import React from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { Link } from "react-router-dom";

const PageBar: React.FC = () => {
  const { userStore } = useStore();

  return (
    <>
      <h3>Page name</h3>
      {userStore.isLoggedIn ? (
        <Button color="purple" onClick={userStore.logout}>
          Log out
        </Button>
      ) : (
        <>
          <Link to="/login">
            <Button color="purple">Log in</Button>
          </Link>
          <Link to="/register">
            <Button color="purple">Register</Button>
          </Link>
        </>
      )}
    </>
  );
};

export default observer(PageBar);
