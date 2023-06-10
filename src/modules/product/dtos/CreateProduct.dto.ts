import { Ingredient } from 'src/typeorm/entities/Ingredients';

export interface ICreateProductDto {
  name: string;
  value: number;
  ingredients: number[];
}

export interface ICreateProductOutputDto {
  id: number;
  name: string;
  value: number;
  ingredients: Ingredient[];
}
