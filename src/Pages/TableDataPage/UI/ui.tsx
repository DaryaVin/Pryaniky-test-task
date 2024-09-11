import { TableData } from "@/Widgets/TableData";
import { Alert, AlertTitle, Skeleton, Stack } from "@mui/material";
import { CreateDataBtn } from "@/Features/CRUDData/CreateData";
import { useAppSelector } from "@/Shared/Model";
import { Check, Error } from "@mui/icons-material";
import { useState } from "react";
import { DataItem } from "@/Entities/Data";
import { DataFilterInput } from "@/Features/FilterData";

export const TableDataPage = () => {
  const { isLoading, dataItems, statusMessage, error } = useAppSelector(
    (state) => state.data
  );

  const [currentDataItemArr, setCurrentDataItemArr] =
    useState<DataItem[]>(dataItems);

  const alertIcon = statusMessage?.status === "success" ? <Check /> : <Error />;
  return (
    <Stack
      width={"100%"}
      minWidth={320}
      spacing={3}
      display={"flex"}
      justifyContent={"flex-start"}
      alignContent={"center"}
      component={"main"}
      alignItems={"center"}
      sx={{ p: 2, position: "relative" }}
    >
      <Stack direction="row" spacing={2}>
        <DataFilterInput
          dataItems={dataItems}
          setDataItems={setCurrentDataItemArr}
          disabled={isLoading}
        />
        <CreateDataBtn disabled={isLoading} />
      </Stack>
      {!isLoading ? (
        <TableData dataItems={currentDataItemArr} />
      ) : (
        <Skeleton width={"100%"} height={170} />
      )}
      {statusMessage && (
        <Alert
          icon={alertIcon}
          severity={statusMessage.status}
          sx={{ position: "absolute", zIndex: 1000, m: 0 }}
        >
          <AlertTitle>{statusMessage.message}</AlertTitle>
          {error && error.message}
        </Alert>
      )}
    </Stack>
  );
};
