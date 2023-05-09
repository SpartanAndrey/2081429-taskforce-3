import { Body, Controller, Post, Get, Req, UseFilters, HttpStatus, Param, Patch, Query, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
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
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CustomeridInterceptor } from './interceptors/customerid.interceptor';
import { CheckAuthorInterceptor } from './interceptors/check-author.interceptor';
import { ContractoridInterceptor } from './interceptors/contractorid.interceptor';
import { fillTaskData } from './util/fill-task-data';

@ApiTags('tasks')
@Controller('tasks')
@UseFilters(AxiosExceptionFilter)
export class TasksController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created.'
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CustomeridInterceptor)
  @Post('create')
  public async create(@Body() createTaskDto: CreateTaskDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}`, createTaskDto);
    return data;
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The task found.'
  })
  @Get(':id/data')
  public async show(@Param('id') id: number) {
    
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/${id}`);

    const userData = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${data.userId}`)).data;
    
    delete data.userId;
    delete data.contractorId;
    
    return {...data, user: userData};
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The status of task has been successfully updated.'
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Patch(':id/status')
  public async updateStatus(@Param('id') id: number, @Body() updateTaskStatusDto: UpdateTaskStatusDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}/${id}/status`, updateTaskStatusDto);
    return data;
  }
  
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The contractor has been successfully added.'
  })
  @Patch(':id/contractor')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CustomeridInterceptor, CheckAuthorInterceptor)
  public async addContractorToTask(@Param('id') id: number, @Body() updateTaskResponseDto: UpdateTaskResponseDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}/${id}/contractor`, updateTaskResponseDto);
    return data;
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The contractor has been successfully added.'
  })
  @Patch(':id/response')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(ContractoridInterceptor)
  public async addResponseToTask(@Param('id') id: number, @Body() updateTaskResponseDto: UpdateTaskResponseDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}/${id}/response`, updateTaskResponseDto);
    return data;
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The tasks are provided.'
  })
  @Get('all')
  public async index(@Query() query: TaskQuery) {
    
    const tasks = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/`, { params: query })).data;

    return fillTaskData(tasks, this.httpService);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The new tasks are provided.'
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(ContractoridInterceptor)
  @Get('new')
  public async indexNew(@Query() query: TaskQuery) {

    const tasks = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/new/data`, { params: query })).data;

    return fillTaskData(tasks, this.httpService);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Your tasks are provided.'
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CustomeridInterceptor)
  @Get('customer/my')
  public async indexCustomerMy(@Req() req: Request, @Query() query: TaskQuery) {

    const userId = req.body.userId;

    const tasks = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/customer/${userId}/my`, { params: query })).data;

    return fillTaskData(tasks, this.httpService);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Your tasks are provided.'
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(ContractoridInterceptor)
  @Get('contractor/my')
  public async indexContractorMy(@Req() req: Request, @Query() query: TaskQuery) {

    const userId = req.body.userId;

    const tasks = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tasks}/contractor/${userId}/my`, { params: query })).data;

    return fillTaskData(tasks, this.httpService);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task has been successfully deleted.'
  })
  @Delete('/:id')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CustomeridInterceptor, CheckAuthorInterceptor)
  async destroy(@Param('id') id: number) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Tasks}/${id}`);
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comments}/task/${id}`);
  }
}
