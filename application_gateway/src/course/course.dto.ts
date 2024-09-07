// src/user/dto/create-user.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CourseDto {
        
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  campusId: number;  // Add the campusId to link the user with the campus
}