/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostsDto } from './dto/posts.dto';
import { PostsService } from './posts.service';
import {  Request } from 'express';

@Controller('posts')
@ApiTags('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    /**
   *
   * @param postsDto accepts objects of postsDto
   * @returns bed object , if bed is added Successfully
   */
  @Post('/addPosts')
  addPosts(
    @Body() postsDto: PostsDto,
    @Req() request: Request,
  ): Promise<string> {
    return this.postsService.addPosts(postsDto, request);
  }

  @Get('/AllPosts')

  async getAllPosts( @Req() request: Request):Promise<any>{
      return await this.postsService.getAllPosts(request); 
  }

  @Get('/posts/:id')
  async getPostsById(@Param('id') id:number, @Req() request: Request):Promise<any>{
    return await this.postsService.getPostsById(id,request);
  }

  @Delete('/delete/:id')
  async deletePostsById(@Param('id') id:number, @Req() request: Request):Promise<any>{
    return await this.postsService.deletePostsById(id,request);
  }


  /**
   *
   * @param BedMgmntDto accepts objects of BedMgmntDto
   * @param id accepts input of type number
   * @returns a message if patient gets updates sucessfully
   */
   @Put('/updatePosts/:id')
   updatePosts(
     @Body() postsDto: PostsDto,
     @Req() request: Request,
     @Param('id') id: number,
   ): Promise<string> {
     return this.postsService.updatePosts(id,postsDto, request);
   }
}
