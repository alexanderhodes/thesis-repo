import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ObjectEntity} from './object-entity';

@Entity({
    name: 'object-structure'
})
export class ObjectStructureEntity {

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
    @ManyToOne(() => ObjectEntity, object => object.name)
    @JoinTable({
        name: 'object'
    })
    object: ObjectEntity;

}
