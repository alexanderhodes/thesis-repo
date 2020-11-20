import {Entity, JoinTable, ManyToMany, PrimaryColumn} from 'typeorm';
import {PermissionEntity} from './permission.entity';

@Entity({
    name: "role"
})
export class RoleEntity {

    @PrimaryColumn()
    name: string;
    @ManyToMany(() => PermissionEntity, permission => permission.name, {
        cascade: ["insert", "update"]
    })
    @JoinTable()
    permissions: PermissionEntity[];

}
