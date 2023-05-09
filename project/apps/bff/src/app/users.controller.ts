import { Body, Controller, Post, Get, Req, UseFilters, HttpStatus, Param, Patch } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@project/shared/app-types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';

@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
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
  public async create(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, createUserDto);
    return data;
  }

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
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found.'
  })
  @Get(':id')
  public async show(@Req() req: Request, @Param('id') id: string) {
    
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    if (data.role === UserRole.Customer) {
      const tasksNumber = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/customer/${id}/count`)).data;
      const newTasksNumber = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/customer/${id}/count?status=New`)).data;

      return {...data, publishedTasksCount: tasksNumber, newTasksCount: newTasksNumber};
  
    } else if (data.role === UserRole.Contractor) {
      const completedTasksNumber = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/contractor/${id}/count?status=Completed`)).data;
      const failedTasksNumber = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/contractor/${id}/count?status=Failed`)).data;

      const reviewsNumber = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Reviews}/${id}/data`)).data.length;
      const reviewsSum = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Reviews}/${id}/sum`)).data;

      const ratingTotal = reviewsSum / (reviewsNumber + failedTasksNumber);

      return {...data, completedTasksCount: completedTasksNumber, failedTasksCount: failedTasksNumber, rating: ratingTotal};
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully updated.'
  })
  @Patch(':id')
  public async update(@Req() req: Request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${id}`, updateUserDto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password has been successfully updated.'
  })
  @Patch(':id/password')
  public async updatePassword(@Req() req: Request, @Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${id}/password`, updatePasswordDto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
}
