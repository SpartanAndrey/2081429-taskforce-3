import { TaskService } from './task.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskQuery } from './query/task.query';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskResponseDto } from './dto/update-task-response.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created.'
  })
  @Post('/')
  async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.createTask(dto);
    return fillObject(TaskRdo, newTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The task found.'
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existTask = await this.taskService.getTask(id);
    return fillObject(TaskRdo, existTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The status of task has been successfully updated.'
  })
  @Patch('/:id/status')
  async updateStatus(@Param('id') id: number, @Body() dto: UpdateTaskStatusDto) {
    const updatedTask = await this.taskService.updateTaskStatus(id, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The contractor has been successfully added.'
  })
  @Patch('/:id/contractor')
  async addContractorToTask(@Param('id') id: number, @Body() dto: UpdateTaskResponseDto) {
    const updatedTask = await this.taskService.addContractor(id, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The contractor has been successfully added.'
  })
  @Patch('/:id/response')
  async addResponseToTask(@Param('id') id: number, @Body() dto: UpdateTaskResponseDto) {
    const updatedTask = await this.taskService.addResponse(id, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @Get('/')
  async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getTasks(query);
    return fillObject(TaskRdo, tasks);
  }

  @Get('/:userId/new')
  async getCustomerTasks(@Param('userId') userId: string, @Query() query: TaskQuery) {
    const tasks = await this.taskService.getNewTasks(userId, query);
    return fillObject(TaskRdo, tasks);
  }

  @Get('/customer/:userId')
  async getCustomerTasksCount(@Param('userId') userId: string, @Query() query: TaskQuery) {
    const tasks = await this.taskService.getCustomerTasksNumber(userId, query);
    return fillObject(TaskRdo, tasks);
  }

  @Get('/contractor/:contractorId')
  async getContractorTasksCount(@Param('contractorId') contractorId: string, @Query() query: TaskQuery) {
    const tasks = await this.taskService.getCustomerTasksNumber(contractorId, query);
    return fillObject(TaskRdo, tasks);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task has been successfully deleted.'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskService.deleteTask(id);
  }
}
