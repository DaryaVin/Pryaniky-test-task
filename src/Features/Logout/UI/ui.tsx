import React from "react";
import { useAppDispatch } from "@/Shared/Model";
import { Button } from "@mui/material";
import { logout } from "../Model/actionCreator";

type LogoutBtnProps = {
  label?: string;
};

export const LogoutBtn = ({ label }: LogoutBtnProps) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(logout());
  };
  return (
    <Button onClick={onClick} color="inherit" variant="outlined">
      {label || "Выйти"}
    </Button>
  );
};
