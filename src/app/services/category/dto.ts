export interface ICategoryDto {
  name: string;
  active: boolean;
  dateCreation: Date;
  subcategory: Array<string>;
}
