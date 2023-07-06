export class SelectChemicalViewModel {
  public id: string;
  public Name: string;

  constructor(item: any) {
    this.id = item.id || '';
    this.Name = item.Name || '';
  }
}
