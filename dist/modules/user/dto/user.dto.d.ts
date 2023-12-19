export declare class CreateUserDto {
    username: string;
    password: string;
    account_verify_code: string;
    created: string;
}
export declare class ReadUserDto {
    id: number;
    username: string;
    password: string;
}
export declare class UpdateUserInfo {
    name: string;
    lastname: string;
    identification: string;
    id_type: string;
    status: string;
}
