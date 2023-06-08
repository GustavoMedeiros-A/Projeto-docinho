import { Ingredient } from 'src/typeorm/entities/Ingredients';

export class UpdateProductDto {
  name: string;
  value: number;
  ingredients: number[];
}
