import { Ingredient } from 'src/typeorm/entities/Ingredients';

export interface ICreateProductDto {
  name: string;
  value: number;
  ingredients: Ingredient[];
}
