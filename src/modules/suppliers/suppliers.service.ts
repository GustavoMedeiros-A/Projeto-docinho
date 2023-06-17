import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/typeorm/entities/Supplier';
import { Repository } from 'typeorm';
import { CreateSupplierDTO } from './dtos/CreateSupplier.dto';
import { UpdateSupplierDTO } from './dtos/UpdateSupplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async findAllSuppliers() {
    return await this.supplierRepository.find();
  }

  async findById(id: number) {
    return await this.supplierRepository.findOneBy({ id });
  }

  async createSupplier(supplierDetails: CreateSupplierDTO) {
    const newSupplier = this.supplierRepository.create({
      ...supplierDetails,
      createdAt: new Date(),
    });

    return await this.supplierRepository.save(newSupplier);
  }

  async updateSupplier(id: number, updateSupplierDetails: UpdateSupplierDTO) {
    return await this.supplierRepository.update(
      { id },
      { ...updateSupplierDetails },
    );
  }

  async deleteSupplier(id: number) {
    return await this.supplierRepository.delete(id);
  }
}
