import { useAppDispatch } from "Shared/Model";
import { fetchAllCatalog } from "./Store/actionCreator";
import { CATALOG_TYPE } from "Shared/Types";

export const getAllCatalog = (
  dispatch: ReturnType<typeof useAppDispatch>,
  catalogs: CATALOG_TYPE
) => {
  dispatch(fetchAllCatalog(catalogs));
};
