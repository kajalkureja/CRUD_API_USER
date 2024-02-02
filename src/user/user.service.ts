import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService {

  //inject user repository

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>
  
  ){

  }
  
  create(createUserDto: CreateUserDto) : Promise<User> {

    if (!createUserDto.email) {
      throw new BadRequestException('Email is required');
    }
    
    let user: User = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }

  findAll() : Promise<User[]>{
    return this.userRepository.find();
  }

  
  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    let user: User = new User();
    user.email = updateUserDto.email;
    user.name = updateUserDto.name;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
  
}
