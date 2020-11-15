import {Entity, JoinTable, ManyToMany, PrimaryColumn} from 'typeorm';
import {Permission} from './permission.entity';

@Entity()
export class Role {

    @PrimaryColumn()
    name: string;
    @ManyToMany(() => Permission, permission => permission.name, {
        cascade: ["insert", "update"]
    })
    @JoinTable()
    permissions: Permission[];

}
