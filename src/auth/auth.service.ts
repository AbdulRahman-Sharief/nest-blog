import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}
  async register(credentials: RegisterDTO) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(credentials: LoginDTO) {
    try {
      const user = await this.userRepo.findOne({
        where: { email: credentials.email },
      });
      if (!(await user.comparePassword(credentials.password))) {
        throw new UnauthorizedException('Invalid Credentials');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
