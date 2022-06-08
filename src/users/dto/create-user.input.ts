import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsInt,MinLength,IsNotEmpty,IsOptional,Matches } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsInt()
  @IsOptional()
  @Field()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  username: string


  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  @Field()
  password: string
}
