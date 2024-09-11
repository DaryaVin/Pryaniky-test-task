import { Stack } from "@mui/material";
import { DataItem } from "../Model/Type/dataType";
import { Control, FieldErrors } from "react-hook-form";
import { InputDataItemDate, InputDataItemStr } from "./InputDataItem";

type DataItemFieldsetProps = {
  control: Control<DataItem | Omit<DataItem, "id">>;
  errors: FieldErrors<DataItem | Omit<DataItem, "id">>;
};

export const DataItemFieldset = ({
  control,
  errors,
}: DataItemFieldsetProps) => {
  return (
    <Stack
      component={"div"}
      width={"100%"}
      minWidth={320}
      maxWidth={500}
      spacing={2}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      sx={{ border: 0, p: 0 }}
    >
      <InputDataItemStr
        control={control}
        errors={errors}
        label="Название документа"
        dataKey={"documentName"}
        autoFocus
      />
      <InputDataItemStr
        control={control}
        errors={errors}
        label="Статус"
        dataKey={"documentStatus"}
      />
      <InputDataItemStr
        control={control}
        errors={errors}
        label="Тип документа"
        dataKey={"documentType"}
      />
      <InputDataItemStr
        control={control}
        errors={errors}
        label="Номер сотрудника"
        dataKey={"employeeNumber"}
      />
      <InputDataItemStr
        control={control}
        errors={errors}
        label="Название подписи сотрудника"
        dataKey={"employeeSignatureName"}
      />
      <InputDataItemDate
        control={control}
        errors={errors}
        label={"Дата подписания сотрудником"}
        dataKey={"employeeSigDate"}
      />
      <InputDataItemStr
        control={control}
        errors={errors}
        label="Название подписи компании"
        dataKey={"companySignatureName"}
      />
      <InputDataItemDate
        control={control}
        errors={errors}
        label="Дата подписания компанией"
        dataKey={"companySigDate"}
      />
    </Stack>
  );
};
