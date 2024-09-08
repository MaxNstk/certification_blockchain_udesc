// src/user/dto/create-user.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UserDto {

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
  campusAcronym: string;  
  
  @IsBoolean()
  isCoordinator: boolean = false;

  @IsBoolean()
  isAdmin: boolean = false;
}