import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Permission} from './permission.entity';
import {Role} from './role.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({
        unique: true
    })
    username: string;
    @Column()
    password: string;
    @Column({
        unique: true
    })
    publicKey: string;
    // @ManyToMany(() => Permission, permission => permission.name, {
    //     cascade: ["insert", "update"]
    // })
    // @JoinTable()
    // permissions: Permission[];
    @ManyToMany(() => Role, role => role.name, {
        cascade: ["insert", "update"]
    })
    @JoinTable()
    roles: Role[];

}
