import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RoleEntity} from './role.entity';

@Entity({
    name: "user"
})
export class UserEntity {

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
    @Column({
        unique: true
    })
    privateKey: string;
    @ManyToMany(() => RoleEntity, role => role.name, {
        cascade: ["insert", "update"]
    })
    @JoinTable()
    roles: RoleEntity[];

}
