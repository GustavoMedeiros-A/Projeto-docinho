import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { Repository } from 'typeorm';
import { ICreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { Ingredient } from 'src/typeorm/entities/Ingredients';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async findAllProducts() {
    return await this.productRepository.find();
  }

  async findById(id: number) {
    return await this.productRepository.findOneBy({ id });
  }

  async createProduct(data: ICreateProductDto) {
    const { name, value, ingredients } = data;

    const product = this.productRepository.create({
      name,
      value,
      ingredients,
    });

    return this.productRepository.save(product);
  }
  async updateProduct(id: number, updateProductDetails: UpdateProductDto) {
    // return this.productRepository.update({ id }, { ...updateProductDetails });
  }

  deleteProduct(id: number) {
    return this.productRepository.delete({ id });
  }
}
