import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards, Patch} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { CustomerUserRdo } from './rdo/customer-user.rdo';
import { ContractorUserRdo } from './rdo/contractor-user.rdo';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RequestWithUser, RequestWithTokenPayload } from '@project/shared/app-types';
import { UserRole } from '@project/shared/app-types';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The user has already existed.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, fullName, role } = newUser;
    await this.notifyService.registerSubscriber({ email, fullName })
    
    if (role === UserRole.Customer) {
      return fillObject(CustomerUserRdo, newUser);
    } else if (role === UserRole.Contractor) {
      return fillObject(ContractorUserRdo, newUser);
    }
  }

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found.'
  })
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);

    if (existUser.role === UserRole.Customer) {
      return fillObject(CustomerUserRdo, existUser);
    } else if (existUser.role === UserRole.Contractor) {
      return fillObject(ContractorUserRdo, existUser);
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  
  @UseGuards(JwtAuthGuard)
  @Patch(':id/password')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password has been successfully updated.'
  })
  async updatePassword(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdatePasswordDto) {
    return await this.authService.updatePassword(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully updated.'
  })
  async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateUserDto) { //специализация есть только у исполнителей, надо какую-то проверку
    
    const updatedUser = await this.authService.update(id, dto);
    
    if (updatedUser.role === UserRole.Customer) {
      return fillObject(CustomerUserRdo, updatedUser);
    } else if (updatedUser.role === UserRole.Contractor) {
      return fillObject(ContractorUserRdo, updatedUser);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @Post('/users-list')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The users list has been successfully added.'
  })
  async getUsers(@Body() data: {ids: string[]}) {
    
    const users = await this.authService.getUsersList(data.ids);

    return fillObject(UserRdo, users);
  }
}
