import { IsNotEmpty } from 'class-validator';


export class createUser{
    @IsNotEmpty()
    name : string;
    @IsNotEmpty()
    username : string;
    @IsNotEmpty()
    password : string;
    @IsNotEmpty()
    stream : string;
}