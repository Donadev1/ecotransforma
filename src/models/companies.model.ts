import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, Table , Model} from "sequelize-typescript";
import { Users } from "./users.model";

interface CompaniesAttributes{
    id_company:number;
    user_id:number;
    razon_social:string;
    nit:string;
    address:string;
    phone:string;
}

interface CompaniesCreateAttributes extends Optional<CompaniesAttributes, 'id_company'> {}

@Table({
    tableName:'companies',
    timestamps:false
})
export class Companies extends Model<CompaniesAttributes, CompaniesCreateAttributes> implements CompaniesAttributes{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id_company: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare user_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare razon_social: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare nit: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare address: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare phone: string;
    
}