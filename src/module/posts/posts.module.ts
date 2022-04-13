/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/entitty/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User } from 'src/entitty/user.entity';
import { UserService } from '../user/user.service';
import { JwtTokenService } from 'src/config/providers/jwtService.service';

@Module({
    imports: [
    TypeOrmModule.forFeature([Posts,User]),
        JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: '8h' },
        }),
      ],
      providers:[PostsService,UserService, JwtTokenService,],
      controllers: [PostsController],
})
export class PostsModule {}
