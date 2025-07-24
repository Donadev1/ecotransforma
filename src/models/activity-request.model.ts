import { Optional } from 'sequelize';
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';
import { tipo_lugar } from 'src/types/tipo_lugar';

interface ActivityRequestAttributes{
    id_request:number;
    tipo_lugar:tipo_lugar;
    nombre_contacto:string;
    nombre_lugar: string;
    telefono_contacto: string;
    correo_contacto: string;
    direccion: string;
    actividades: string[];
    mensaje?: string;
    fecha?:Date;
}

interface ActivityRequestCreationAttributes extends Optional<ActivityRequestAttributes, 'id_request'> {}


@Table({ 
    tableName: 'activity_requests',
    timestamps:false
 })
export class ActivityRequest extends Model<ActivityRequestAttributes, ActivityRequestCreationAttributes> implements ActivityRequestAttributes {
  @Column({type: DataType.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true})
  declare id_request: number;

  @Column({type: DataType.ENUM('Barrio','Conjunto Residencial / Edificio','Empresa / Lugar de Trabajo','Institución Educativa')})
  declare tipo_lugar: tipo_lugar;

  @Column({type: DataType.STRING, allowNull: false})
  declare nombre_contacto: string;

  @Column({type: DataType.STRING,allowNull: false})
  declare nombre_lugar: string;

  @Column({type: DataType.STRING, allowNull: false})
  declare telefono_contacto: string;

  @Column({type: DataType.STRING, allowNull: false})
  declare correo_contacto: string;

  @Column({type: DataType.STRING ,allowNull: false})
  declare direccion: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  declare actividades: string[];

  @Column({type: DataType.TEXT,allowNull: false})
  declare mensaje?: string;
  
  @Column({ type: DataType.DATE, allowNull: true })
  declare fecha?: Date; 
}
