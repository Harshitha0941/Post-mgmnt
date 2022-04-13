/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { IsString } from 'class-validator';
import { IsNumber } from 'class-validator';
import { User } from './user.entity';

/* eslint-disable prettier/prettier */


@Entity()
export class Posts {
  /**
   * auto incremental id
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * generates admitTypeName column
   */
  @Column()
  @IsString()
  @ApiProperty()
  title: string;


  /**
   * generates admitTypeName column
   */
   @Column()
   @IsString()
   @ApiProperty()
   description: string;

  /**
   * generates createdAt column
   */
  @Column()
  @IsString()
  created_date: string;

  /**
   * generates updatedTime column
   */
  @Column({ default: ' ' })
  @IsString()
  updated_date: string;

  /**
   * generates createTime column
   */
  @Column()
  @IsString()
  is_featured: string;

 
  @ManyToOne(()=> User,(user)=>user.posts,{
    cascade:true,
  })
  @JoinColumn()
  user:User;
}