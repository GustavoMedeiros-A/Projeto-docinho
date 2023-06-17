import { Ingredient } from 'src/typeorm/entities/Ingredients';

export interface IUpdateProductDto {
  name: string;
  value: number;
  ingredients: number[] | any;
}

export interface IUpdateProductOutputDto {
  id: number;
  name: string;
  value: number;
  ingredients: Ingredient[];
}
