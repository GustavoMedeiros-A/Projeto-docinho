import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { IngredientService } from './ingredients.service';
import { CreateIngredientDto } from './dtos/CreateIngredient.dto';

@Controller('ingredients')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @Get()
  public async getIngredient() {
    return await this.ingredientService.findAllIngredients();
  }

  @Get(':id')
  public async getIngredientById(@Param('id', ParseIntPipe) id: number) {
    return await this.ingredientService.findById(id);
  }

  @Post()
  public async createIngredient(
    @Body() createIngredientDto: CreateIngredientDto,
  ) {
    const { ...ingredientDetails } = createIngredientDto;
    return this.ingredientService.createIngredient(ingredientDetails);
  }
}
