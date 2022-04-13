/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Entity} from "typeorm";
import { IsString, Length } from "class-validator";
/* eslint-disable prettier/prettier */

/**
 * starting of User Dto
 */
@Entity()
export class UserDto {

    /**
     * receives input username of type string
     */

    @IsString()
    @ApiProperty()
    userName: string;

     /**
     * receives input password of type string
     */
    @ApiProperty() 
    @IsString() 
    @Length(8,16)
    // @Matches(/((?=.\d)|(?=.\W+))(?![.\n])(?=.[A-Z])(?=.[a-z]).*$/, {message: 'password too weak'})
    password: string;

}