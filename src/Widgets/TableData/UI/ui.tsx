import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { Box, ButtonGroup } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { DataItem, dataHeadCells } from "@/Entities/Data";
import {
  createDate,
  descendingComparator,
  formatDateToDDMMYYYY,
} from "@/Shared/Lib";
import { Order } from "../Model/type";
import { UpdateDataBtn } from "@/Features/CRUDData/UpdateData";
import { DeleteDataBtn } from "@/Features/CRUDData/DeleteData";

type TableDataProps = {
  dataItems: DataItem[];
  withUpdateAndDeleteBtns?: boolean;
};
export const TableData = ({
  dataItems,
  withUpdateAndDeleteBtns = true,
}: TableDataProps) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof Omit<DataItem, "id">>("documentName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const createSortHandler = (property: keyof Omit<DataItem, "id">) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getComparator = <Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): ((
    a: { [key in Key]: Date | string },
    b: { [key in Key]: Date | string }
  ) => number) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataItems.length) : 0;

  const visibleRows: DataItem[] = React.useMemo(
    () =>
      [...dataItems]
        .map((data) => {
          const companySigDate = createDate(data.companySigDate);
          const employeeSigDate = createDate(data.employeeSigDate);
          return {
            ...data,
            companySigDate,
            employeeSigDate,
          };
        })
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, dataItems]
  );

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", pb: 2 }}>
      <TableContainer sx={{ pl: "1em", pr: "1em" }}>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow sx={{ textAlign: "center" }}>
              {dataHeadCells.map((headCell) => (
                <TableCell
                  key={headCell.dataKey}
                  align={"left"}
                  sortDirection={orderBy === headCell.dataKey ? order : false}
                  sx={{ fontWeight: "bold" }}
                >
                  <TableSortLabel
                    active={orderBy === headCell.dataKey}
                    direction={orderBy === headCell.dataKey ? order : "asc"}
                    onClick={createSortHandler(headCell.dataKey)}
                  >
                    {headCell.label}
                    {orderBy === headCell.dataKey ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
              {withUpdateAndDeleteBtns && (
                <TableCell
                  align={"left"}
                  sx={{ fontWeight: "bold" }}
                ></TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {dataHeadCells.map((cell) => {
                    const content =
                      typeof row[cell.dataKey] === "string"
                        ? row[cell.dataKey]
                        : formatDateToDDMMYYYY(row[cell.dataKey] as Date);
                    return (
                      <TableCell align="left" key={cell.dataKey}>
                        {content as string}
                      </TableCell>
                    );
                  })}
                  {withUpdateAndDeleteBtns && (
                    <TableCell align="left">
                      <ButtonGroup>
                        <UpdateDataBtn dataItem={row} />
                        <DeleteDataBtn dataItem={row} />
                      </ButtonGroup>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {withUpdateAndDeleteBtns && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, page) => {
            handleChangePage(page);
          }}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};
