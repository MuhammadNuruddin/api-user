import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt,Length,Min,IsNotEmpty } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Length(3, 30)
  @IsNotEmpty()
  @IsString()
  @Field()
  username: string


  @IsNotEmpty()
  @Min(6)
  @IsString()
  @Field()
  password: string
}
