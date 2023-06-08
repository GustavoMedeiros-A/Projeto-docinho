import {
  Body,
  Controller,
  Get,
  Post,
  ParseIntPipe,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserService } from './users.service';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  public async getUsers() {
    return await this.userService.findAllUsers();
  }

  @Get(':id')
  public async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findById(id);
  }

  @Post()
  public async createUsers(@Body() createUserDto: CreateUserDto) {
    const { ...userDetails } = createUserDto;
    return this.userService.createUser(userDetails);
  }

  @Put(':id')
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { ...updateUserDetails } = updateUserDto;
    await this.userService.updateUser(id, updateUserDetails);
    return updateUserDetails;
  }

  @Delete(':id')
  public async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userService.deleteUser(id);
    return 'Usuário deletado';
  }
}
