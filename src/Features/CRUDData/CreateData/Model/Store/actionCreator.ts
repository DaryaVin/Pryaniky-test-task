import { DataItem, DataSlice } from "@/Entities/Data";
import { DataService } from "@/Features/CRUDData/API/services";
import { AppDispatch, onChengeStatusMessage } from "@/Shared/Model";
import axios from "axios";

export const createData =
  (item: Omit<DataItem, "id">) => async (dispatch: AppDispatch) => {
    const {
      onCreateData,
      onFetchData,
      onFetchDataError,
      onChengeStatusMessageData,
    } = DataSlice.actions;
    try {
      dispatch(onFetchData());
      const response = await DataService.create(item);
      if (response.data.data && response.data.error_code === 0) {
        dispatch(onCreateData(response.data.data));
        onChengeStatusMessage(
          "success",
          "Создана новая запись с вашими данными",
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
          "Не удалось создать новую запись, попробуйте еще раз",
          dispatch,
          onChengeStatusMessageData
        );
      }
      return false;
    } catch (e) {
      if (
        axios.isAxiosError(e) &&
        typeof e.response?.data.message === "string"
      ) {
        dispatch(
          onFetchDataError({
            message: e.response?.data.message,
            errorCode: e.response?.status.toString(),
          })
        );
        onChengeStatusMessage(
          "error",
          "Не удалось создать новую запись, попробуйте еще раз",
          dispatch,
          onChengeStatusMessageData
        );
      } else {
        dispatch(
          onFetchDataError({
            message: "Неизвестная ошибка получения данных",
            errorCode: "unknownError",
          })
        );

        onChengeStatusMessage(
          "error",
          "Не удалось создать новую запись, попробуйте еще раз",
          dispatch,
          onChengeStatusMessageData
        );
      }
      return false;
    }
  };
