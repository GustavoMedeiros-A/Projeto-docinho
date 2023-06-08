import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAllUsers() {
    return await this.userRepository.find();
  }

  async findById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(userDetails: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });

    return await this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateUserDetails: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
}
