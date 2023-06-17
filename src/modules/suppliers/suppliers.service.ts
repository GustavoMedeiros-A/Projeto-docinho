import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/typeorm/entities/Supplier';
import { Repository } from 'typeorm';
import { CreateSupplierDTO } from './dtos/CreateSupplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async findAllSuppliers() {
    return await this.supplierRepository.find();
  }

  async findById(idSupplier: number) {
    return await this.supplierRepository.findOneBy({ idSupplier });
  }

  async createSupplier(supplierDetails: CreateSupplierDTO) {
    const newSupplier = this.supplierRepository.create({
      ...supplierDetails,
      createdAt: new Date(),
    });

    return await this.supplierRepository.save(newSupplier);
  }
}
