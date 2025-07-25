import { Sequelize } from 'sequelize-typescript';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { Optional } from 'sequelize';

export interface VolunteersAttributes {
  id_volunteer: number;
  nombre: string;
  phone: string;
  email: string;
  address: string;
  disponibilidad_dias: string[];
  mensaje?: string
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
  declare nombre: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  declare phone: string;

  @Column({ unique: true, type: DataType.STRING(100), allowNull: false })
  declare email: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare address: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT), allowNull: false })
  declare disponibilidad_dias: string[];

  @Column({ type: DataType.STRING, allowNull:true})
  declare mensaje?: string;
}
