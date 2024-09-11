import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../UI/Layout/ui";
import { routeEndpointList } from "@/Shared/Routes";
import { LoginPage } from "@/Pages/LoginPage";
import { checkAuth } from "@/Features/CheckAuth";
import { IsAuth, IsNotAuth } from "@/Features/IsAuth";
import { store } from "@/Shared/Model";
import { readAllData } from "@/Features/CRUDData/ReadData/Model/Store/actionCreator";
import { TableDataPage } from "@/Pages/TableDataPage";

const createLoader =
  (needAuth?: boolean, loaderFunc?: () => void) => async () => {
    const isAuth = await checkAuth();
    if (needAuth && !isAuth) {
      window.location.replace(
        window.location.origin + "/" + routeEndpointList.login.path
      );
    }
    if (needAuth === false && isAuth) {
      window.location.replace(
        window.location.origin + "/" + routeEndpointList.tableData.path
      );
    }
    if (loaderFunc) loaderFunc();
    return null;
  };

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: routeEndpointList.login.path,
        loader: createLoader(false),
        element: (
          <IsNotAuth>
            <LoginPage />
          </IsNotAuth>
        ),
      },
      {
        path: routeEndpointList.tableData.path,
        loader: createLoader(true, () => {
          store.dispatch(readAllData());
        }),
        element: (
          <IsAuth>
            <TableDataPage />
          </IsAuth>
        ),
      },
    ],
  },
]);
