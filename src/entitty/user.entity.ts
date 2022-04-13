/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import { IsString } from "class-validator";
import * as bcrypt from 'bcrypt';

import { Posts } from "./post.entity";

/* eslint-disable prettier/prettier */

/**
 * starting of User Entity
 */
@Entity()
export class User {

    /**
     * auto incremental id
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * generates UserName column
     */
    @Column({ unique: true })
    @IsString()
    @ApiProperty()
    userName: string;


    /**
     * generates isActive column
     */
    @Column()
    @ApiProperty()
    password: string;

    /**
     * generates updatedAt column
     */
    @Column({ default: ' ' })
    @IsString()
    display_name: string;

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

    static password: any;

     /**
     * generates a bcrypted password ie hashed password
     */
      @BeforeInsert()
      async strongPassword() {
          console.log("entered");
          this.password = await bcrypt.hash(this.password, 10);
      }

    
    @OneToMany(() => Posts, (posts) => posts.user, {
    })
    posts: Posts[];

}