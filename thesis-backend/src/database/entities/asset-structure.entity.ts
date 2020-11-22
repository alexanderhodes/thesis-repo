import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {AssetEntity} from './asset.entity';

@Entity({
    name: 'asset-structure'
})
export class AssetStructureEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    field: string;
    @Column()
    datatype: string;
    @Column()
    schema: string;
    @Column({
        default: false
    })
    nullable: boolean;
    @Column({
        default: false
    })
    deletable: boolean;
    @Column()
    createTimestamp: Date;
    @Column()
    updateTimestamp: Date;
    @ManyToOne(() => AssetEntity, asset => asset.name)
    @JoinTable({
        name: 'asset'
    })
    asset: AssetEntity;

}
