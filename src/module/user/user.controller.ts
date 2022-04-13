/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, Res  } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
   *
   * @param userDto accepts objects of adduserDto
   * @returns user object , if user is added Successfully
   */
  @Post('/addUser') 
  addUserDetails(@Body() userDto: UserDto): Promise<string> {
    return this.userService.addUserDetails(userDto);
  }

  @Post('/login')
  login(@Body() userDto: UserDto,@Res({ passthrough: true }) response: Response,
  @Req() request: Request,) {
    return this.userService.login(userDto, response, request);
  }

  /**
   * 
   * @param response recevies the response
   * @returns a msg if user logged out successfully
   */
   @Post('logout')
   async logout(@Res({passthrough:true}) response : Response){
     response.clearCookie('jwt');
     return {
       message:"user logged out successfully"
     }
   }

   
}