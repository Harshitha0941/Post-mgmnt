/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from './../../entitty/user.entity';



@Injectable()
export class JwtTokenService {
  /**
   * using constructor we inject the classes
   * @param jwtService with jwtservice class name
   */
  constructor(private jwtService: JwtService) {}
  /**
   * by using generatetoken method we return data
   * @param data by passing id
   * @returns jwt
   */
  async generateToken(data: User) {
    const jwt = await this.jwtService.signAsync({ id: data.id });
    return jwt;
  }
  /**
   * by using verifytoken method we return data
   * @param token we take token as a parameter
   * @returns data
   */
  async verifyToken(token: string) {
    const data = await this.jwtService.verifyAsync(token);
    if (!data) {
      throw new UnauthorizedException();
    }
    return data;
  }
  /**

   * by using deletetoken method we return logout
   * @param response taking response jwt
   * @returns logout message
   */
  async deleteToken(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'logout',
    };
  }
}
