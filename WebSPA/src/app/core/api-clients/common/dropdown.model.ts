export class GetDropdownsRequest {
  keyword!: string;
  page_index!: number;
  id!: string;
}

export interface DropdownModel {
  id: string | number | null;
  name: string | null;
}
