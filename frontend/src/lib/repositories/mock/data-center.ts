import type { IDataCenterRepository, PaginationOpts, PaginatedResult } from "../interfaces";
import type { ImportRecord, FieldMapping } from "@/types/api";
import { getStore } from "./store";

export class MockDataCenterRepository implements IDataCenterRepository {
  async getSources() {
    return { sources: getStore().dataSources };
  }

  async getImportHistory(opts?: PaginationOpts): Promise<PaginatedResult<ImportRecord>> {
    const store = getStore();
    const page = opts?.page ?? 1;
    const pageSize = opts?.pageSize ?? 20;
    const start = (page - 1) * pageSize;
    return {
      items: store.importHistory.slice(start, start + pageSize),
      total: store.importHistory.length,
      page,
      pageSize,
    };
  }

  async getFieldMappings(): Promise<FieldMapping[]> {
    return getStore().fieldMappings;
  }
}
