export class UserDto {
    id: string;
    username: string;
    password: string;
}

export interface UserResponseDTO {
    id: string;
    username: string;
}

export class UpdateWithPasswordDTO {
    readonly user: string;
    readonly password: string;
}
