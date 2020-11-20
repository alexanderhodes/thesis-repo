import {Entity, PrimaryColumn} from 'typeorm';

@Entity({
    name: "permission"
})
export class PermissionEntity {

    @PrimaryColumn()
    name: string;

}
