import { LogoutBtn } from "@/Features/Logout";
import { useAppSelector } from "@/Shared/Model";
import { routeEndpointList } from "@/Shared/Routes";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const AuthState = useAppSelector((state) => state.auth);
  const location = useLocation();

  const headerStr = Object.values(routeEndpointList).find((route) => {
    return "/" + route.path === location.pathname;
  })?.name;

  return (
    <AppBar position="static" sx={{ flexGrow: 1, width: 1 / 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="h1"
          sx={{ flexGrow: 1, textAlign: "start" }}
        >
          {headerStr}
        </Typography>
        {AuthState.authItem && <LogoutBtn />}
      </Toolbar>
    </AppBar>
  );
};
