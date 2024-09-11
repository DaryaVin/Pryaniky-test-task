import { DataItem } from "@/Entities/Data";
import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";

type DataFilterInputProps = {
  dataItems: DataItem[];
  setDataItems: (v: DataItem[]) => void;
} & OutlinedInputProps;
export const DataFilterInput = ({
  dataItems,
  setDataItems,
  ...props
}: DataFilterInputProps) => {
  const [filterStr, setFilterStr] = useState<string>("");

  useEffect(() => {
    if (filterStr.trim() === "") {
      setDataItems(dataItems);
    } else {
      const newDataArr: DataItem[] = [];
      dataItems.forEach((item) => {
        const valArr = Object.values(item);
        for (let index = 0; index < valArr.length; index++) {
          const val = valArr[index];
          if (
            typeof val === "string" &&
            val
              .toLocaleLowerCase()
              .trim()
              .includes(filterStr.toLocaleLowerCase().trim())
          ) {
            newDataArr.push(item);
            break;
          }
        }
      });

      setDataItems(newDataArr);
    }
  }, [filterStr, dataItems]);
  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <InputLabel htmlFor={"FilterInput"}>Фильтр</InputLabel>
      <OutlinedInput
        {...props}
        id={"FilterInput"}
        value={filterStr}
        onChange={(e) => {
          setFilterStr(e.target.value);
        }}
      />
    </FormControl>
  );
};
