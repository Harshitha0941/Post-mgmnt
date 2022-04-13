/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Entity} from "typeorm";
import { IsString} from "class-validator";
/* eslint-disable prettier/prettier */

/**
 * starting of User Dto
 */
@Entity()
export class PostsDto {

    /**
     * receives input username of type string
     */

    @IsString()
    @ApiProperty()
    title: string;

     /**
     * receives input username of type string
     */

      @IsString()
      @ApiProperty()
      description: string;

}