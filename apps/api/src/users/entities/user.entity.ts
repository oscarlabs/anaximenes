import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  fistName: string;

  @Column
  lastName: string;

  @Column
  isActive: boolean;
}
