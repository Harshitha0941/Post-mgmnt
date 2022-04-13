/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import {  Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtTokenService } from 'src/config/providers/jwtService.service';

import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Response, Request} from 'express';
import { User } from 'src/entitty/user.entity';
import { WrongCredentialsException } from 'src/config/filters/customException.exception';

// import require from 'express';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtToken: JwtTokenService,
    private jwtService: JwtService,

  ) { }

  /**
*
* @param userDto accepts objects of adduserDto
* @returns user object , if user is added Successfully
*/
  async addUserDetails(userDto: UserDto): Promise<string> {
    const user: User = new User();
    Object.assign(user, userDto);
    user.display_name = userDto.userName;
    const date = new Date();
    user.created_date = date.toLocaleDateString();
    user.updated_date = date.toLocaleTimeString();
    await this.userRepository.save(user);
    return "user added Successfully";
  }

  async login(userDto: UserDto, response: Response, req: Request) {
    const user:User = await this.userLogin(userDto.userName);
    console.log(user);
    if (!user) {
      throw new WrongCredentialsException();
    }
    if (!(await bcrypt.compare(userDto.password, user.password))) {
      throw new WrongCredentialsException();
    }
    const jwt = await this.jwtToken.generateToken(user);
    response.cookie('jwt', jwt, { httpOnly: true });
    const cookie = req.cookies['jwt'];
    const result = await this.jwtToken.verifyToken(cookie);
    // const LocalStorage = require('node-localstorage').LocalStorage,
    // localStorage = new LocalStorage('./scratch');
    // const result = await this.jwtToken.verifyToken(localStorage);
    return result;
  }

  async userLogin(userName: string) {
    return await this.userRepository.findOne({ where: { userName: userName } });
  }

  async getUserById(id:number){
    return await this.userRepository.findOne({ where: { id: id } })
  }
}