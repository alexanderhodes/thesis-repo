import {Entity, PrimaryColumn} from 'typeorm';

@Entity({
    name: 'relation'
})
export class RelationEntity {

    @PrimaryColumn()
    name: string;

}
