import { InputType, Field } from "@nestjs/graphql";
import { IsString,IsNotEmpty } from 'class-validator';

@InputType()
export class LoginUserInput {

    @Field()
    id: number;    

    @IsNotEmpty()
    @IsString()
    @Field()
    username: string;


    @IsNotEmpty()
    @IsString()
    @Field()
    password: string
}