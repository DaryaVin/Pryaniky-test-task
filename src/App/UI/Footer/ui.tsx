import { AppBar, AppBarProps, Toolbar, Typography } from "@mui/material";

export const Footer = ({ ...props }: AppBarProps) => {
  return (
    <AppBar
      component={"footer"}
      position="static"
      color={"default"}
      sx={{ flexGrow: 1, width: 1 / 1 }}
      {...props}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="p"
          sx={{ flexGrow: 1, textAlign: "start" }}
        >
          Разработчик: Виноградова Дарья
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ flexGrow: 1, textAlign: "end" }}
        >
          Ссылка на гитхаб:{" "}
          <a href="https://github.com/DaryaVin">https://github.com/DaryaVin</a>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
