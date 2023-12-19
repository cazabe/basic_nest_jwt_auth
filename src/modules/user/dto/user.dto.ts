import { IsNotEmpty, IsString, IsEmail, IsNumber, IsDateString } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    account_verify_code: string;

    @IsDateString()
    created: string
}

export class ReadUserDto {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UpdateUserInfo {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    identification: string;

    @IsNotEmpty()
    @IsString()
    id_type: string;

    @IsNotEmpty()
    @IsString()
    status: string;
}
