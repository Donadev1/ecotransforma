import {  Optional } from "sequelize";
import { Column, DataType, ForeignKey, Table , Model, HasOne} from "sequelize-typescript";
import { Users } from "./users.model";
import { Punctuation } from "./punctuation.model";


interface PersonAttributtes{
    id_person:number;
    user_id:number;
    address:string;
    phone:string;
    neighborhood:string;
}

interface PersonCreationAttributtes extends Optional<PersonAttributtes, 'id_person'>{}

@Table({
    tableName:'persons',
    timestamps:false
})

export class Persons extends Model<PersonAttributtes, PersonCreationAttributtes> implements PersonAttributtes{

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id_person:number;

    @ForeignKey(()=> Users)
    @Column({type:DataType.INTEGER, allowNull:false})
    declare user_id:number

    @Column({ type: DataType.TEXT, allowNull: false })
    declare address:string;

    @Column({ type: DataType.STRING(20), allowNull: false })
    declare phone: string;

    @Column({ type: DataType.STRING(20), allowNull: false })
    declare neighborhood:string

    @HasOne(()=> Punctuation, {foreignKey:'person_id'})
    declare Puntuation?:Punctuation;

}