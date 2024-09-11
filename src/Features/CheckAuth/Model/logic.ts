import { AuthSlice } from "@/Entities/User";
import { store } from "@/Shared/Model";
import Cookies from "js-cookie";
export const checkAuth = async () => {
  const accessToken = Cookies.get("token");
  const { onFetchAuth, onFetchAuthSucces } = AuthSlice.actions;
  await store.dispatch(onFetchAuth());
  if (accessToken) {
    await store.dispatch(
      onFetchAuthSucces({
        id: accessToken,
      })
    );
  } else {
    await store.dispatch(onFetchAuthSucces(null));
  }
  return !!accessToken;
};
