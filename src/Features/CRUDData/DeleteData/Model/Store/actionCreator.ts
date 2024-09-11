import { DataSlice } from "@/Entities/Data";
import { DataService } from "@/Features/CRUDData/API/services";
import { AppDispatch, onChengeStatusMessage } from "@/Shared/Model";
import axios from "axios";

export const deleteData = (id: string) => async (dispatch: AppDispatch) => {
  const {
    onDeleteData,
    onFetchData,
    onFetchDataError,
    onChengeStatusMessageData,
  } = DataSlice.actions;
  try {
    dispatch(onFetchData());
    const response = await DataService.delete(id);
    if (response.data.error_code === 0) {
      dispatch(onDeleteData(id));
      onChengeStatusMessage(
        "success",
        "Запись в таблице успешно удалена",
        dispatch,
        onChengeStatusMessageData
      );
      return true;
    } else {
      dispatch(
        onFetchDataError({
          message: response.data.error_message,
          errorCode: response.data.error_code.toString(),
        })
      );
      onChengeStatusMessage(
        "error",
        "Не удалось удалить запись, попробуйте еще раз",
        dispatch,
        onChengeStatusMessageData
      );
    }
    return false;
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
      "Не удалось удалить запись, попробуйте еще раз",
      dispatch,
      onChengeStatusMessageData
    );
    return false;
  }
};
