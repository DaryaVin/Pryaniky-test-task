import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthError, AuthItem } from "../Type/authType";

type StatusType = {
  status: "success" | "error";
  message: string;
};

interface InitialStateProps {
  authItem: AuthItem | null;
  isLoading: boolean;
  error: AuthError | null;
  statusMessage: StatusType | null;
}
const initialState: InitialStateProps = {
  authItem: null,
  isLoading: false,
  error: null,
  statusMessage: null,
};
export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onFetchAuth(state) {
      state.isLoading = true;
    },
    onFetchAuthError(state, action: PayloadAction<AuthError | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    onChengeStatusMessageAuth(state, action: PayloadAction<StatusType | null>) {
      state.statusMessage = action.payload;
    },

    onFetchAuthSucces(state, action: PayloadAction<AuthItem | null>) {
      state.isLoading = false;
      state.error = null;
      state.authItem = action.payload;
    },
  },
});

export default AuthSlice.reducer;
