export enum routeEndpoint {
  login = "authorization",
  tableData = "",
}
export enum nameRouteEndpoint {
  login = "Авторизация",
  tableData = "Таблица с данными",
}
export const routeEndpointList: {
  [key: string]: {
    path: string;
    name: string;
  };
} = {
  login: {
    path: "authorization",
    name: "Авторизация",
  },
  tableData: {
    path: "",
    name: "Таблица с данными",
  },
};
