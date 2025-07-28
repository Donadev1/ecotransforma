import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Rol } from '../types/rol';
import { Optional } from 'sequelize';
import { Persons } from './persons.model';
import { Community } from './community.model';
import { Companies } from './companies.model';



export interface UsersAttributes {
  id_user: number;
  nombre: string;
  email: string;
  contrasena: string;
  rol: Rol;
  creado_en?: Date;
}

interface UsuarioCreationAttributes extends Optional<UsersAttributes, 'id_user'> {}

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: false,
})
export class Users extends Model<UsersAttributes, UsuarioCreationAttributes> implements UsersAttributes{
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id_user: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare nombre: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare contrasena: string;

  @Column({
    type: DataType.ENUM('administrador', 'persona', 'comunidad', 'empresa'),
    allowNull: false,
  })
  declare rol: Rol;

  @Column({ type: DataType.DATE, allowNull: true })
  declare creado_en?: Date;


  @HasOne(() => Persons, { foreignKey: 'user_id' })
  declare persons?:Persons;

  @HasOne(()=> Community, {foreignKey: 'user_id'})
  declare community?:Community;

  @HasOne(()=> Companies, {foreignKey: 'user_id'})
  declare companies?:Companies;
}


