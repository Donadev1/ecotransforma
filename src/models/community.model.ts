import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, Table , Model} from "sequelize-typescript";
import { Users } from "./users.model";


interface CommunityAttributtes{
    id_community:number,
    user_id:number,
    name_comumnity:string;
    ubicacion:string
    representante:string
}

interface CommunityCreationAttributtes extends Optional<CommunityAttributtes, 'id_community'>{}

@Table({
    tableName:'community',
    timestamps:false
})

export class Community extends Model<CommunityAttributtes, CommunityCreationAttributtes> implements CommunityAttributtes{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id_community: number;

    @ForeignKey(() => Users) // Replace Model with your actual User model if available
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare user_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name_comumnity: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare ubicacion: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare representante: string;
    
}