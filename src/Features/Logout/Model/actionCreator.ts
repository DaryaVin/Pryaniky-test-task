import Cookies from "js-cookie";
import { AppDispatch } from "@/Shared/Model";
import { AuthSlice } from "@/Entities/User";
import { DataSlice } from "@/Entities/Data";

export const logout = () => async (dispatch: AppDispatch) => {
  const { onFetchAuthSucces } = AuthSlice.actions;
  const { onResetDataState } = DataSlice.actions;

  Cookies.remove("token");
  dispatch(onFetchAuthSucces(null));
  dispatch(onResetDataState());
};
