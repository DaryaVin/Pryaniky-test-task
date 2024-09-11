import React, { Fragment, useState } from "react";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataItem, DataItemFieldset } from "@/Entities/Data";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "@/Shared/Model";
import { updateData } from "../Model/Store/actionCreator";
import { Edit } from "@mui/icons-material";

type UpdateDataBtnProps = {
  dataItem: DataItem;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const UpdateDataBtn = ({ dataItem, ...props }: UpdateDataBtnProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<DataItem, "id">>({
    defaultValues: { ...dataItem },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate: SubmitHandler<Omit<DataItem, "id">> = async (data) => {
    await dispatch(updateData({ ...data, id: dataItem.id }));
    handleClose();
  };

  return (
    <Fragment>
      <IconButton
        {...props}
        aria-label={"update-" + dataItem.id}
        color="primary"
        onClick={handleClickOpen}
      >
        <Edit />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="update-form-dialog-title"
        aria-describedby="update-form-dialog"
      >
        <DialogTitle id="update-form-dialog-title">
          Форма изменения записи
        </DialogTitle>
        <DialogContent dividers={true}>
          <DataItemFieldset control={control} errors={errors} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit(handleCreate)}>Изменить</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
