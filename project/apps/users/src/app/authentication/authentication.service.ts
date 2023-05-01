import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import dayjs from 'dayjs';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { TaskUserEntity } from '../task-user/task-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { TaskUserRepository } from '../task-user/task-user.repository';
import { User } from '@project/shared/app-types';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '@project/config/config-users';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/util/util-core';
import * as crypto from 'node:crypto';


@Injectable()
export class AuthenticationService {
  constructor(
    private readonly taskUserRepository: TaskUserRepository,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
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
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }
}
