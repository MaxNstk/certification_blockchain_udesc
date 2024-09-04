// src/user/dto/create-user.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  campusId: number;  // Add the campusId to link the user with the campus
}