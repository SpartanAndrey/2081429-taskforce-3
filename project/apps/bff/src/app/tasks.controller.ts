import { Body, Controller, Post, Get, Req, UseFilters, HttpStatus, Param, Patch, Query, Delete } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskResponseDto } from './dto/update-task-response.dto';
import { TaskQuery } from './query/task.query';
import { TaskRdo } from './rdo/task.rdo';

@ApiTags('tasks')
@Controller('tasks')
@UseFilters(AxiosExceptionFilter)
export class TasksController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Post('create')
  public async create(@Body() createTaskDto: CreateTaskDto) { //непонятно как при создании автоматически добавить пользователя
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}`, createTaskDto);
    return data;
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/${id}`);

    const userData = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${data.userId}`)).data;
    const contractorData = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${data.contractorId}`)).data;
    const commentsData = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/task/${id}`)).data;

    delete data.userId;
    delete data.contractorId;
    
    return {...data, user: userData, contractor: contractorData, comments: commentsData};
  }

  @Patch(':id/status')
  public async updateStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}/${id}/status`, updateTaskStatusDto);
    return data;
  }
  
  @Patch(':id/contractor')
  public async addContractorToTask(@Param('id') id: string, @Body() updateTaskResponseDto: UpdateTaskResponseDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}/${id}/contractor`, updateTaskResponseDto);
    return data;
  }

  @Patch(':id/response')
  public async addResponseToTask(@Param('id') id: string, @Body() updateTaskResponseDto: UpdateTaskResponseDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}/${id}/response`, updateTaskResponseDto);
    return data;
  }

  @Get('tasks')
  public async index(@Query() query: TaskQuery) {
    
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}`, { params: query });

    data.map(async (task: TaskRdo) => {
        const userData = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${task.userId}`)).data;
        const contractorData = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${task.contractorId}`)).data;
        const commentsData = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/task/${task.id}`)).data;
    
        delete data.userId;
        delete data.contractorId;
        return {...data, user: userData, contractor: contractorData, comments: commentsData};
    })

    return data;
    }

  @Delete('/:id')
  async destroy(@Param('id') id: number) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Tasks}/${id}`);
  }
}
