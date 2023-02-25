import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  async create(createUserDto): Promise<User | null> {
    try {
      const user = await User.create(createUserDto);
      return user;
    } catch (err) {
      return err;
    }
  }

  async findAll(): Promise<User[] | null> {
    const users = await User.findAll();
    return users;
  }

  async findByUuid(uuid: string): Promise<User> {
    const user = User.findByPk(uuid);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await User.findOne({ where: { email: email } });
      return user;
    } catch (err) {
      return err;
    }
  }
}
