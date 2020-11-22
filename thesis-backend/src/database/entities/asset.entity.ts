import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import {AssetStructureEntity} from './asset-structure.entity';

@Entity({
    name: 'asset'
})
export class AssetEntity {

    @PrimaryColumn()
    name: string;
    @Column({
        default: false
    })
    deletable: boolean;
    @OneToMany(() => AssetStructureEntity, assetStructure => assetStructure.asset)
    assetStructure: AssetStructureEntity[];
}
