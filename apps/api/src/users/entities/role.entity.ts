import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  Index,
  Length,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserRole } from './user-role.entity';

@Table
export class Role extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Index
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  uuid: string;

  @Unique
  @AllowNull(false)
  @Length({
    min: 3,
    max: 120,
    msg: "The length of post title can't be shorter than 3 and longer than 60",
  })
  @Column
  description: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @DeletedAt
  @Column
  deletedAt: Date;

  // @HasMany(() => UserRole, { foreignKey: 'roleId' })
  // userRoles: UserRole[];
}
