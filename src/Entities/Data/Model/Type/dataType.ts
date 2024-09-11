export type DataItem = {
  id: string;
  companySigDate: string | Date;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string | Date;
  employeeSignatureName: string;
};

export interface DataResponse {
  error_code: number;
  error_message: string;
  data?: DataItem;
}
export interface DatasResponse {
  error_code: number;
  error_message: string;
  data: DataItem[];
}

export interface DataError {
  status?: "success" | "error";
  message: string;
  errorCode?: string;
  dataue?: DataItem;
}

export interface DataHeadCell {
  dataKey: keyof Omit<DataItem, "id">;
  label: string;
}
