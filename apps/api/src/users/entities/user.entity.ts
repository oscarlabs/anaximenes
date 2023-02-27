import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserRole } from './user-role.entity';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    // primaryKey: true,
  })
  uuid: string;

  @Unique
  @IsEmail
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column(DataType.DATEONLY)
  dob: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;

  @CreatedAt
  @Column({
    field: 'createdAt',
    type: DataType.DATE,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updatedAt',
    type: DataType.DATE,
    defaultValue: null,
  })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deletedAt', type: DataType.DATE })
  deletedAt: Date;

  @HasMany(() => UserRole, 'userId')
  userRoles: UserRole[];

  @BeforeCreate
  static fieldsNormalization(instance: User) {
    instance.email = instance.email.toLocaleLowerCase();
  }
}
