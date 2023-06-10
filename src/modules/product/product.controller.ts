import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ICreateProductDto } from './dtos/CreateProduct.dto';
import { IUpdateProductDto } from './dtos/UpdateProduct.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  public async getProducts() {
    return await this.productService.findAllProducts();
  }

  @Get(':id')
  public async getProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findById(id);
  }

  @Post()
  public async createProduct(@Body() createProductDto: ICreateProductDto) {
    const { ...productDetails } = createProductDto;
    return this.productService.createProduct(productDetails);
  }

  @Put(':id')
  public async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: IUpdateProductDto,
  ) {
    const { ...updateProductDetails } = updateProductDto;
    await this.productService.updateProduct(id, updateProductDto);
    return updateProductDetails;
  }

  @Delete(':id')
  public async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const product = await this.getProductById(id);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    await this.productService.deleteProduct(id);
    return 'Product Removed successfully';
  }
}
