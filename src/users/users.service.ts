import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user-schema';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User as user_entity} from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private readonly users = [
    // {
    //   id: 1,
    //   username: 'Nuruddin',
    //   password: 'secret'
    // },
    // {
    //   id: 2,
    //   username: 'Zeeya',
    //   password: 'password'
    // }
  ];

  async create(createUserInput: CreateUserInput) {
    const saltOrRounds = 10;
    const user_password = await bcrypt.hash(createUserInput.password, saltOrRounds);
   const user = this.userRepository.create({
    ...createUserInput,
    password: user_password
  })

  //  this.users.push(user);
  await this.userRepository.save(user);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(username: string): Promise<user_entity> {
    return await this.userRepository.findOneOrFail({
      where: {
          username: username,
      },
  });
  }

  // async storeUser() {
  //   const saltOrRounds = 10;
  // const password = 'random_password';
  // const hash = await bcrypt.hash(password, saltOrRounds);
  // }


}
