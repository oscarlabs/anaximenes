import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  async create(createUserDto): Promise<User | null> {
    try {
      const user = await (
        await User.create(createUserDto)
      ).get({ plain: true });
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
    const user = (await User.findByPk(uuid)).get({ plain: true });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await (
        await User.findOne({
          where: { email: email },
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        })
      ).get({ plain: true });
      return user;
    } catch (err) {
      return err;
    }
  }

  async getUserInformation(email: string): Promise<User> {
    try {
      const user = await (
        await User.findOne({
          where: { email: email },
        })
      ).get({ plain: true });
      return user;
    } catch (err) {
      return err;
    }
  }
}
