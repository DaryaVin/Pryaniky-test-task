import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";
import { DataItem } from "../Model/Type/dataType";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type InputDataItemProps = {
  dataKey: keyof Omit<DataItem, "id">;
  label: string;
  rules?: Omit<
    RegisterOptions<
      DataItem | Omit<DataItem, "id">,
      keyof Omit<DataItem, "id">
    >,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  control: Control<DataItem | Omit<DataItem, "id">>;
  errors: FieldErrors<DataItem | Omit<DataItem, "id">>;
};
type InputDataItemStrProps = InputDataItemProps & OutlinedInputProps;
type InputDataItemDateProps = InputDataItemProps &
  DatePickerProps<Dayjs, false>;

export const InputDataItemDate = ({
  dataKey,
  label,
  control,
  rules,
  errors,
  ...props
}: InputDataItemDateProps) => {
  return (
    <Controller
      name={dataKey}
      control={control}
      rules={rules || { required: "Данное поле обязательно для заполнения" }}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...props}
            label={label}
            {...field}
            value={field.value ? dayjs(field.value) : null}
            onChange={(v) => {
              field.onChange(v?.toDate());
            }}
            sx={{ width: "100%" }}
            disableFuture
          />
          <Typography color="red">{errors[dataKey]?.message}</Typography>
        </LocalizationProvider>
      )}
    />
  );
};

export const InputDataItemStr = ({
  dataKey,
  label,
  control,
  rules,
  errors,
  ...props
}: InputDataItemStrProps) => {
  return (
    <Controller
      name={dataKey}
      control={control}
      rules={rules || { required: "Данное поле обязательно для заполнения" }}
      render={({ field }) => (
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor={"DataItemFieldset-" + dataKey}>
            {label}
          </InputLabel>
          <OutlinedInput
            {...props}
            {...field}
            id={"DataItemFieldset-" + dataKey}
            type={"text"}
            label={label}
            error={dataKey in errors}
            required
          />
          <Typography color="red">{errors[dataKey]?.message}</Typography>
        </FormControl>
      )}
    />
  );
};
