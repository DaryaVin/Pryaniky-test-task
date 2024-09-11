import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataError, DataItem } from "../Type/dataType";

type StatusType = {
  status: "success" | "error";
  message: string;
};

interface InitialStateProps {
  dataItems: DataItem[];
  isLoading: boolean;
  error: DataError | null;
  statusMessage: StatusType | null;
}
const initialState: InitialStateProps = {
  dataItems: [],
  isLoading: false,
  error: null,
  statusMessage: null,
};
export const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    onFetchData(state) {
      state.isLoading = true;
    },
    onFetchDataError(state, action: PayloadAction<DataError | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    onChengeStatusMessageData(state, action: PayloadAction<StatusType | null>) {
      state.statusMessage = action.payload;
    },

    onCreateData(state, action: PayloadAction<DataItem>) {
      state.isLoading = false;
      state.error = null;
      state.dataItems.push(action.payload);
    },
    onReadAllData(state, action: PayloadAction<DataItem[]>) {
      state.isLoading = false;
      state.error = null;
      state.dataItems = action.payload;
    },

    onUpdateData(state, action: PayloadAction<DataItem>) {
      state.isLoading = false;
      state.error = null;
      const indexItem = state.dataItems.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (indexItem >= 0) {
        state.dataItems[indexItem] = action.payload;
      } else {
        state.statusMessage = {
          status: "error",
          message: "Записи с таким id не существует",
        };
        throw new Error("Записи с таким id не существует");
      }
    },

    onDeleteData(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = null;
      const indexItem = state.dataItems.findIndex((item) => {
        return item.id === action.payload;
      });
      if (indexItem >= 0) {
        state.dataItems.splice(indexItem, 1);
      } else {
        state.statusMessage = {
          status: "error",
          message: "Записи с таким id не существует",
        };
        throw new Error("Каталога с таким id не существует");
      }
    },
    onResetDataState(state) {
      state.dataItems = initialState.dataItems;
      state.error = initialState.error;
      state.isLoading = initialState.isLoading;
      state.statusMessage = initialState.statusMessage;
    },
  },
});

export default DataSlice.reducer;
