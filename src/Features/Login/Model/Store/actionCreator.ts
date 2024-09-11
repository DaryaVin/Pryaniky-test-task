import axios from "axios";
import Cookies from "js-cookie";
import { AuthService } from "../../API/services";
import { AppDispatch, onChengeStatusMessage } from "@/Shared/Model";
import { AuthItem, AuthSlice } from "@/Entities/User";

export const login =
  (authItem: Omit<AuthItem, "id">) => async (dispatch: AppDispatch) => {
    const {
      onFetchAuth,
      onFetchAuthSucces,
      onFetchAuthError,
      onChengeStatusMessageAuth,
    } = AuthSlice.actions;
    try {
      dispatch(onFetchAuth());
      const response = await AuthService.login(authItem);
      Cookies.set("token", response.data.data.token);
      dispatch(
        onFetchAuthSucces({
          ...authItem,
          id: response.data.data.token,
        })
      );
    } catch (e) {
      if (
        axios.isAxiosError(e) &&
        typeof e.response?.data.message === "string"
      ) {
        dispatch(
          onFetchAuthError({
            message: e.response?.data.message,
            errorCode: e.response?.status.toString(),
          })
        );
      } else {
        dispatch(
          onFetchAuthError({
            message: "Неизвестная ошибка логанизации",
            errorCode: "unknownError",
          })
        );
      }
      onChengeStatusMessage(
        "error",
        "Не удалось произвести вход в систему",
        dispatch,
        onChengeStatusMessageAuth
      );
    }
  };
