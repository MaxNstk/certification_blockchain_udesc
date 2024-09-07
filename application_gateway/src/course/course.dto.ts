// src/user/dto/create-user.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Campus } from 'src/campus/campus.schema';

export class CourseDto {
        
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  campusId: number; 
}