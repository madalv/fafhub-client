import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../stores/store";
export default function PrivateRoutes() {
  const {
    userStore: { isLoggedIn },
  } = useStore();
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
