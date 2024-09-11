import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

export const onChengeStatusMessage = (
  status: "error" | "success",
  message: string,
  dispatch: AppDispatch,
  onChengeStatusMessage: ActionCreatorWithPayload<{
    status: "success" | "error";
    message: string;
  } | null>
) => {
  dispatch(
    onChengeStatusMessage({
      status,
      message,
    })
  );
  setTimeout(() => {
    dispatch(onChengeStatusMessage(null));
  }, 3000);
};
