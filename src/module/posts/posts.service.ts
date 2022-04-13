/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Posts } from './../../entitty/post.entity';
import { PostsDto } from './dto/posts.dto';
import {  Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { IdNotFoundException, UserNotFoundException } from 'src/config/filters/customException.exception';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postRepo: Repository<Posts>,
        private jwtService: JwtService,
        private userService: UserService,
    ){}

    async addPosts(postsDto:PostsDto, request:Request):Promise<any>{
        const cookie = request.cookies['jwt'];
        if(!cookie){
            throw new UserNotFoundException();
        }
        else{
        const data = await this.jwtService.verifyAsync(cookie);
        console.log("from post",data);
        const result = await this.userService.getUserById(data.id);
        const posts: Posts = new Posts();
        Object.assign(posts,postsDto);
        const date = new Date();
        posts.created_date  = date.toLocaleDateString();
        posts.updated_date = date.toLocaleDateString();
        posts.is_featured  = date.toLocaleDateString();
        posts.user = result;
        await this.postRepo.save(posts);
        return "Posted data successfully";
        }
        
    }

    async getAllPosts(request:Request):Promise<any>{
        const cookie = request.cookies['jwt'];
        if(!cookie){
            throw new UserNotFoundException();
        }
        else{
        return this.postRepo.find();
        }
    }

    async getPostsById(id:number,request:Request):Promise<any>{
        const cookie = request.cookies['jwt'];
        if(!cookie){
            throw new UserNotFoundException();
        }
        else{
        const result = await this.postRepo.findOne({ where: { id: id } });
        if(result){
            return result;
        }
        else{
            throw new IdNotFoundException();
        }
        }
    }

    async deletePostsById(id:number,request:Request):Promise<string>{
        const cookie = request.cookies['jwt'];
        if(!cookie){
            throw new UserNotFoundException();
        }
        else{
            const result = await this.getPostsById(id,request);
            if(result){
            const result = await this.postRepo.delete(id);
            console.log("from delete",result);
            return "Posts Deleted Successfully";
        }
        else{
            throw new IdNotFoundException();
        }
        }
    }

    async updatePosts(id:number,postsDto:PostsDto,request:Request):Promise<string>{
        const cookie = request.cookies['jwt'];
        if(!cookie){
            throw new UserNotFoundException();
        }
        else{
        const data = await this.jwtService.verifyAsync(cookie);
        const result = await this.userService.getUserById(data.id);
        const posts: Posts = new Posts();
        Object.assign(posts,postsDto);
        const date = new Date();
        posts.created_date  = date.toLocaleDateString();
        posts.updated_date = date.toLocaleDateString();
        posts.is_featured  = date.toLocaleDateString();
        posts.user = result;
        const result1 = await this.getPostsById(id,request);
        if(result1){
        await this.postRepo.update(id,posts);
        return "Updated Successfully";
        }
        else{
            throw new IdNotFoundException();
        }
    }
    }
}
