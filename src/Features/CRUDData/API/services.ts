import { DataItem, DataResponse, DatasResponse } from "@/Entities/Data";
import { $api, urlEndpoints } from "@/Shared/API";
import { AxiosResponse } from "axios";

export class DataService {
  static async create(
    item: Omit<DataItem, "id">
  ): Promise<AxiosResponse<DataResponse>> {
    return $api.post<DataResponse>(urlEndpoints.TABLE.create, item);
  }
  static async readAll(): Promise<AxiosResponse<DatasResponse>> {
    return $api.get<DatasResponse>(urlEndpoints.TABLE.readAll);
  }
  static async update(item: DataItem): Promise<AxiosResponse<DataResponse>> {
    return $api.post<DataResponse>(urlEndpoints.TABLE.update(item.id), item);
  }
  static async delete(id: string): Promise<AxiosResponse<DataResponse>> {
    return $api.post<DataResponse>(urlEndpoints.TABLE.delete(id));
  }
}
