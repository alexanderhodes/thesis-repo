import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {RelationEntity} from './relation-entity';

@Entity({
    name: 'relation-structure'
})
export class RelationStructureEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    field: string;
    @Column()
    createTimestamp: Date;
    @Column()
    updateTimestamp: Date;
    @ManyToOne(() => RelationEntity, relation => relation.name)
    @JoinTable({
        name: 'relation'
    })
    relation: RelationEntity;

}
