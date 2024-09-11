import React, { Fragment, useState } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch } from "@/Shared/Model";
import { deleteData } from "../Model/Store/actionCreator";
import { Delete } from "@mui/icons-material";
import { DataItem, dataHeadCells } from "@/Entities/Data";
import { formatDateToDDMMYYYY } from "@/Shared/Lib";

type DeleteDataBtnProps = {
  dataItem: DataItem;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const DeleteDataBtn = ({ dataItem, ...props }: DeleteDataBtnProps) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    await dispatch(deleteData(dataItem.id));
    handleClose();
  };

  return (
    <Fragment>
      <IconButton
        {...props}
        aria-label={"delete-" + dataItem.id}
        color="primary"
        onClick={handleClickOpen}
      >
        <Delete />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="delete-form-dialog-title"
        aria-describedby="delete-form-dialog"
        sx={{ width: "100%", maxWidth: "100%", minWidth: "fit-content" }}
      >
        <DialogTitle id="delete-form-dialog-title">Удаление записи</DialogTitle>
        <DialogContent sx={{ width: "fit-content", maxWidth: "100%" }}>
          <Typography>
            Вы уверены, что хотите уда лить данную запись?
          </Typography>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow sx={{ textAlign: "center" }}>
                {dataHeadCells.map((headCell) => (
                  <TableCell
                    key={headCell.dataKey}
                    align={"left"}
                    sx={{ fontWeight: "bold" }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {dataHeadCells.map((cell) => {
                  const content =
                    typeof dataItem[cell.dataKey] === "string"
                      ? dataItem[cell.dataKey]
                      : formatDateToDDMMYYYY(dataItem[cell.dataKey] as Date);
                  return (
                    <TableCell align="left" key={cell.dataKey}>
                      {content as string}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleDelete}>Удалить</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
