import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { In, Repository } from 'typeorm';
import {
  ICreateProductDto,
  ICreateProductOutputDto,
} from './dtos/CreateProduct.dto';
import {
  IUpdateProductDto,
  IUpdateProductOutputDto,
} from './dtos/UpdateProduct.dto';
import { Ingredient } from 'src/typeorm/entities/Ingredients';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async findAllProducts() {
    const products = await this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.ingredients', 'ingredient')
      .getMany();

    return products;
  }

  async findById(id: number) {
    const product = await this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.ingredients', 'ingredient')
      .where('products.id = :id', { id })
      .getOne();

    if (!product) {
      return 'product not found';
    }
    return product;
  }

  async createProduct(
    data: ICreateProductDto,
  ): Promise<ICreateProductOutputDto> {
    const { name, value, ingredients } = data;

    try {
      const newProduct = this.productRepository.create({
        name,
        value,
      });

      const ingredient = await this.ingredientRepository.findBy({
        id: In([ingredients]),
      });

      newProduct.ingredients = ingredient;

      const createdProduct = await this.productRepository.save(newProduct);

      return createdProduct;
    } catch (err) {
      throw new Error(err);
    }
  }
  async updateProduct(id: number, data: IUpdateProductDto) {
    const { name, value, ingredients } = data;
    try {
      const ingredient = await this.ingredientRepository.findBy({
        id: In([ingredients]),
      });

      const updateProduct = this.productRepository.findOneBy({ id });
      if (!updateProduct) {
        throw new Error('Product not found');
      }

      console.log(((await updateProduct).ingredients = ingredient));
      await this.productRepository.update(
        { id },
        {
          name,
          value,
        },
      );

      return updateProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteProduct(id: number) {
    return this.productRepository.delete({ id });
  }
}
