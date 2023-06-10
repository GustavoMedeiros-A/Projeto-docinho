import { Ingredient } from 'src/typeorm/entities/Ingredients';

export interface IUpdateProductDto {
  name: string;
  value: number;
  ingredients: number[];
}

export interface IUpdateProductOutputDto {
  id: number;
  name: string;
  value: number;
  ingredients: Ingredient[];
}
