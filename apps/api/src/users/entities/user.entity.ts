import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  uuid: string;

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
}
