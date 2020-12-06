import {Column, Entity, PrimaryColumn} from 'typeorm';

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
}
