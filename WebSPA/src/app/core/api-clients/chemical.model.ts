export interface Chemical {
  id: string;
  name: string;
  chemicalType: string;
  preHarvestIntervalInDays: string;
  activeIngredient: string;
  creationDate: string;
  modificationDate: string;
  deletionDate: string;
}

export class AddChemicalCommand {
  name: string;
  chemicalTypeId: number;
  preHarvestIntervalInDays: string;
  activeIngredient: string;

  constructor(obj: any) {
    this.name = obj?.name ?? '';
    this.chemicalTypeId = obj?.chemicalTypeId ?? 0;
    this.preHarvestIntervalInDays = obj?.preHarvestIntervalInDays ?? '';
    this.activeIngredient = obj?.activeIngredient ?? '';
  }
}
