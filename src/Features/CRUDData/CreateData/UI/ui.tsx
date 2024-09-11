import React, { Fragment, useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataItem, DataItemFieldset } from "@/Entities/Data";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "@/Shared/Model";
import { createData } from "../Model/Store/actionCreator";

export const CreateDataBtn = ({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<DataItem, "id">>();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate: SubmitHandler<Omit<DataItem, "id">> = async (data) => {
    await dispatch(createData(data));
    handleClose();
  };

  return (
    <Fragment>
      <Fab
        {...props}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{ zIndex: 0 }}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="create-form-dialog-title"
        aria-describedby="create-form-dialog"
      >
        <DialogTitle id="create-form-dialog-title">
          Форма создания записи
        </DialogTitle>
        <DialogContent dividers={true}>
          <DataItemFieldset control={control} errors={errors} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit(handleCreate)}>Создать</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
