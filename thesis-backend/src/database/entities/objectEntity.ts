import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import {ObjectStructureEntity} from './object-structure.entity';

@Entity({
    name: 'object'
})
export class ObjectEntity {

    @PrimaryColumn()
    name: string;
    @Column({
        default: false
    })
    deletable: boolean;
    @OneToMany(() => ObjectStructureEntity, objectStructure => objectStructure.object)
    objectStructure: ObjectStructureEntity[];
}
