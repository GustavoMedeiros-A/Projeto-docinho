import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/typeorm/entities/Ingredients';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dtos/CreateIngredient.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async findAllIngredients() {
    return await this.ingredientRepository.find();
  }

  async findById(id: number) {
    return await this.ingredientRepository.findOneBy({ id });
  }

  async createIngredient(ingredientDetails: CreateIngredientDto) {
    const newIngredient = this.ingredientRepository.create({
      ...ingredientDetails,
    });

    return await this.ingredientRepository.save(newIngredient);
  }
}
