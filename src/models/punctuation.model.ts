import { Optional } from "sequelize";
import { Column, DataType, ForeignKey, Table, Model, BelongsTo } from "sequelize-typescript";
import { Persons } from "./persons.model";
import { Community } from "./community.model";

interface PunctuationAttributes {
    id_punctuation: number;
    person_id?: number;
    community_id?: number;
    puntos: number;
    presupuesto: number;
    motivo: string;
    observacion?: string;
    fecha: Date;
}

interface PunctuationCreationAttributes extends Optional<PunctuationAttributes, 'id_punctuation' | 'observacion' | 'fecha'> {}

@Table({
    tableName: 'punctuation',
    timestamps: true,
    createdAt: 'fecha',
    updatedAt:false
})
export class Punctuation extends Model<PunctuationAttributes, PunctuationCreationAttributes> implements PunctuationAttributes {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id_punctuation: number;

    @ForeignKey(() => Persons)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare person_id?: number;

    @ForeignKey(() => Community)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare community_id?: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare puntos: number;

    @Column({ type: DataType.DECIMAL(12, 2), allowNull: false })
    declare presupuesto: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    declare motivo: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare observacion?: string;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    declare fecha: Date;

    // Relaciones
    @BelongsTo(() => Persons, 'person_id')
    person?: Persons;

    @BelongsTo(() => Community, 'community_id')
    community?: Community;
}