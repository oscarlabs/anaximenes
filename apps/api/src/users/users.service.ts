import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const password = await bcrypt.hash(createUserDto.password, saltOrRounds);

    createUserDto = {
      ...createUserDto,
      password,
    };

    const user = await this.usersRepository.create(createUserDto);

    return user;
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findById(uuid: string) {
    return this.usersRepository.findByUuid(uuid);
  }

  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
