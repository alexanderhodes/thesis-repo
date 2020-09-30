import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Permission} from './permission.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    publicKey: string;
    @ManyToMany(type => Permission, permission => permission.name, {
        cascade: ["insert", "update"]
    })
    @JoinTable()
    permissions: Permission[];

}
