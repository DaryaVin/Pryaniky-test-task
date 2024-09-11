import { useAppSelector } from "@/Shared/Model";
import { routeEndpoint } from "@/Shared/Routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type IsAuthProps = {
  children: JSX.Element;
  path?: routeEndpoint;
  delay?: number;
};

export const IsAuth = ({
  children,
  path = routeEndpoint.login,
  delay = 0,
}: IsAuthProps) => {
  const navigate = useNavigate();

  const AuthState = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!AuthState.authItem) {
      setTimeout(() => {
        navigate("/" + path);
      }, delay);
    }
  }, [AuthState.authItem]);
  return children;
};
export const IsNotAuth = ({
  children,
  path = routeEndpoint.tableData,
  delay = 0,
}: IsAuthProps) => {
  const navigate = useNavigate();

  const AuthState = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (AuthState.authItem) {
      setTimeout(() => {
        navigate("/" + path);
      }, delay);
    }
  }, [AuthState.authItem]);
  return children;
};
