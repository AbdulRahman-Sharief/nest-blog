import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import {} from 'class-transformer';

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}
