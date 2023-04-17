import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import dayjs from 'dayjs';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { TaskUserEntity } from '../task-user/task-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { TaskUserRepository } from '../task-user/task-user.repository';
import { TokenPayload, User } from '@project/shared/app-types';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthenticationService {
  constructor(
    private readonly taskUserRepository: TaskUserRepository,
    private readonly jwtService: JwtService,
    ) {}
    
  public async register(dto: CreateUserDto) {
    const {fullName, email, city, password, role, dateBirth} = dto;
    
    const taskUser = {
      fullName, email, city, role, avatar: '', dateBirth: dayjs(dateBirth).toDate(), passwordHash: ''
    };
    
    const existUser = await this.taskUserRepository
      .findByEmail(email);
    
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }
    
    const userEntity = await new TaskUserEntity(taskUser)
      .setPassword(password)
    
    return this.taskUserRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.taskUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const taskUserEntity = new TaskUserEntity(existUser);
    if (!await taskUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return taskUserEntity.toObject();
  }

  public async getUser(id: string) {
    return this.taskUserRepository.findById(id);
  }

  public async createUserToken(user: User) {
    const payload: TokenPayload = {
      sub: user._id,
      fullname: user.fullName,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
