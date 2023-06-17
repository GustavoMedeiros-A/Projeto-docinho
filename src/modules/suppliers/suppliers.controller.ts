import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { SupplierService } from './suppliers.service';
import { CreateSupplierDTO } from './dtos/CreateSupplier.dto';
import { UpdateSupplierDTO } from './dtos/UpdateSupplier.dto';
@Controller('/suppliers')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  @Get()
  public async getSuppliers() {
    return await this.supplierService.findAllSuppliers();
  }

  @Get(':id')
  public async getSupplierById(id: number) {
    return await this.supplierService.findById(id);
  }

  @Post()
  public async createSupplier(@Body() createSupplierDto: CreateSupplierDTO) {
    const { ...supplierDetails } = createSupplierDto;
    return await this.supplierService.createSupplier(supplierDetails);
  }

  @Put(':id')
  public async updateSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDTO,
  ) {
    const { ...updateSupplierDetails } = updateSupplierDto;
    await this.supplierService.updateSupplier(id, updateSupplierDetails);
    return updateSupplierDetails;
  }

  @Delete(':id')
  public async deleteSupplier(@Param('id', ParseIntPipe) id: number) {
    const supplier = await this.supplierService.findById(id);
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    await this.supplierService.deleteSupplier(id);
    return 'Supplier deleted';
  }
}
