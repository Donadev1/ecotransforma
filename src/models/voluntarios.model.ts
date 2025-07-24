import { Sequelize } from 'sequelize-typescript';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { Optional } from 'sequelize';

export interface VolunteersAttributes {
  id_volunteer: number;
  nombre: string;
  phone: string;
  email: string;
  address: string;
  disponibilidad_dias: string;
}

interface VolunteersCreationAttributes
  extends Optional<VolunteersAttributes, 'id_volunteer'> {}

@Table({ tableName: 'volunteers', timestamps: false })
export class Volunteers
  extends Model<VolunteersAttributes, VolunteersCreationAttributes>
  implements VolunteersAttributes
{
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id_volunteer: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  nombre!: string;

  @Column({ type: DataType.STRING(15), allowNull: false })
  phone!: string;

  @Column({ unique: true, type: DataType.STRING(100), allowNull: false })
  email!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  address!: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT), allowNull: false })
  disponibilidad_dias!: string;
}
