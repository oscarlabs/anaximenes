import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  async create(createUserDto): Promise<User | null> {
    try {
      const user = (await User.create(createUserDto)).get({ plain: true });

      const userRoles = await UserRole.bulkCreate(
        [
          {
            userId: user.id,
            roleId: 2,
          },
          {
            userId: user.id,
            roleId: 3,
          },
        ],
        {
          ignoreDuplicates: true,
        },
      );

      return { ...user, ...userRoles };
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
      const user = await User.findOne({
        where: { email: email },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });

      const userRoles = await user.$get('userRoles');
      console.log('ROLES 1', userRoles);

      return user;
    } catch (err) {
      return err;
    }
  }

  async getUserInformation(email: string): Promise<User> {
    try {
      const user = await User.findOne({
        where: { email: email },
        include: [
          {
            model: UserRole,
            required: true,
            attributes: ['roleId'],
            include: [
              {
                model: Role,
                as: 'role',
                required: true,
                attributes: ['description'],
              },
            ],
          },
        ],
        // raw: true,
      });

      // const userRoles = await user.$get('userRoles');

      // console.log('ROLES 2', userRoles);

      return { ...user.get({ plain: true }) };
    } catch (err) {
      return err;
    }
  }
}
