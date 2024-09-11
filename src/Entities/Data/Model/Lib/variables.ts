import { DataHeadCell } from "../Type/dataType";

export const dataHeadCells: readonly DataHeadCell[] = [
  {
    dataKey: "documentName",
    label: "Название документа",
  },
  {
    dataKey: "documentType",
    label: "Тип документа",
  },
  {
    dataKey: "documentStatus",
    label: "Статус",
  },
  {
    dataKey: "employeeNumber",
    label: "Номер сотрудника",
  },
  {
    dataKey: "employeeSigDate",
    label: "Дата подписания сотрудником",
  },
  {
    dataKey: "employeeSignatureName",
    label: "Название подписи сотрудником",
  },
  {
    dataKey: "companySigDate",
    label: "Дата подписания компанией",
  },
  {
    dataKey: "companySignatureName",
    label: "Название подписи компании",
  },
];
