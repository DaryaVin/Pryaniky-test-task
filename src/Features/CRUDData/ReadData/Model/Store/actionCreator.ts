import { DataSlice } from "@/Entities/Data";
import { DataService } from "@/Features/CRUDData/API/services";
import { AppDispatch, onChengeStatusMessage } from "@/Shared/Model";
import axios from "axios";

export const readAllData = () => async (dispatch: AppDispatch) => {
  const {
    onReadAllData,
    onFetchData,
    onFetchDataError,
    onChengeStatusMessageData,
  } = DataSlice.actions;
  try {
    dispatch(onFetchData());
    const response = await DataService.readAll();
    if (response.data.data) {
      dispatch(onReadAllData(response.data.data));
    }
  } catch (e) {
    if (axios.isAxiosError(e) && typeof e.response?.data.message === "string") {
      dispatch(
        onFetchDataError({
          message: e.response?.data.message,
          errorCode: e.response?.status.toString(),
        })
      );
    } else {
      dispatch(
        onFetchDataError({
          message: "Неизвестная ошибка получения данных",
          errorCode: "unknownError",
        })
      );
    }
    onChengeStatusMessage(
      "error",
      "Не удалось подгрузить ваши рубрики, попробуйте обновить страницу",
      dispatch,
      onChengeStatusMessageData
    );
  }
};
