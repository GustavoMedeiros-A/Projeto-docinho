import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Ingredient } from 'src/typeorm/entities/Ingredients';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Ingredient])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
