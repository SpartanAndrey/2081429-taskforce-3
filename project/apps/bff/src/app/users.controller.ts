import { Body, Controller, Post, Get, Req, UseFilters, HttpStatus, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRdo } from './rdo/user.rdo';
import { UserRole } from '@project/shared/app-types';

@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

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
  public async show(@Param('id') id: string) {
    
    const user: UserRdo = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`);

    if (user.role === UserRole.Customer) {
      const tasksCount = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/customer/${id}`);
      const newTasksCount = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/customer/${id}?status=New`);
      
      return {...user, publishedTasksCount: tasksCount, newTasksCount: newTasksCount};
  
    } else if (user.role === UserRole.Contractor) {
      const completedTasksCount = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/contractor/${id}?status=Completed`);
      const failedTasksCount = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/customer/${id}?status=Failed`);

      return {...user, completedTasksCount: completedTasksCount, failedTasksCount: failedTasksCount};
    }
  }
}
