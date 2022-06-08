import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsString, IsInt,Length,IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsInt()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Length(3, 30)
  @IsNotEmpty()
  @IsString()
  @Field()
  username: string
}
