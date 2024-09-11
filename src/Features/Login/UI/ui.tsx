import React, { useState } from "react";
import { login } from "../Model/Store/actionCreator";
import { useAppDispatch, useAppSelector } from "@/Shared/Model";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type logFormFields = {
  username: string;
  password: string;
};
type LoginFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export const LoginForm = ({ ...props }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const AuthState = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<logFormFields>();

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const onClickShowPassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const onSubmit: SubmitHandler<logFormFields> = async (data) => {
    dispatch(login(data));
  };
  return AuthState.isLoading ? (
    <div>
      <CircularProgress />
    </div>
  ) : (
    <form
      {...props}
      className={"LoginForm" + (props.className ? " " + props.className : "")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
        width={320}
        spacing={2}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Controller
          name={"username"}
          control={control}
          rules={{
            required: "Данное поле обязательно для заполнения",
            pattern: /^(user)\d+$/,
          }}
          render={({ field }) => (
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor={"username"}>Логин</InputLabel>
              <OutlinedInput
                {...field}
                id={"username"}
                type={"text"}
                label={"Login"}
                error={"username" in errors}
                required
              />
              <Typography color="red">{errors.username?.message}</Typography>
              {errors.username?.type === "pattern" && (
                <Typography color="red">
                  Логин должен соответствовать схеме: "user" + любое число.
                  Например: user1
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Controller
          name={"password"}
          control={control}
          rules={{
            required: "Данное поле обязательно для заполнения",
            pattern: /^password$/,
          }}
          render={({ field }) => (
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor={"password"}>Пароль</InputLabel>
              <OutlinedInput
                {...field}
                id={"password"}
                type={isVisiblePassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={onClickShowPassword}
                      onMouseDown={onClickShowPassword}
                      onMouseUp={onClickShowPassword}
                      edge="end"
                    >
                      {isVisiblePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                error={"password" in errors}
                required
              />
              <Typography color="red">{errors.password?.message}</Typography>
              {errors.password?.type === "pattern" && (
                <Typography color="red">
                  Пароль всегда одинаковый и равен "password"
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Button type="submit" variant="contained" size="large">
          Войти
        </Button>
      </Stack>
    </form>
  );
};
