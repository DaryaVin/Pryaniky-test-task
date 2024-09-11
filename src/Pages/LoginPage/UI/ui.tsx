import { LoginForm } from "@/Features/Login";
import { useAppSelector } from "@/Shared/Model";
import { Check, Error } from "@mui/icons-material";
import { Alert, AlertTitle, Box } from "@mui/material";

export const LoginPage = () => {
  const { statusMessage, error } = useAppSelector((state) => state.auth);
  const alertIcon = statusMessage?.status === "success" ? <Check /> : <Error />;
  return (
    <Box
      component={"main"}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      pt={"4em"}
      position={"relative"}
    >
      {statusMessage && (
        <Alert
          icon={alertIcon}
          severity={statusMessage.status}
          sx={{ position: "absolute", zIndex: 1000, m: 0 }}
        >
          <AlertTitle>{statusMessage.message}</AlertTitle>
          {error && error.message}
        </Alert>
      )}
      <LoginForm />
    </Box>
  );
};
