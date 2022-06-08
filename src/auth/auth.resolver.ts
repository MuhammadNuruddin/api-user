import { GqlAuthGuard } from './gql-authguard';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response';
import { UseGuards } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/create-user.input';



@Resolver()
export class AuthResolver {
   constructor(private authService: AuthService){}
   
   @Mutation(() => LoginResponse)
   @UseGuards(GqlAuthGuard)
   login(@Args('LoginUserInput') loginUserInput: LoginUserInput) {
      return this.authService.login(loginUserInput); 
   }

   @Mutation(() => LoginResponse)
   register(@Args('CreateUserInput') creatUserInput: CreateUserInput) {
    return this.authService.register(creatUserInput); 
 }
}
