import { TaskService } from './task.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskQuery } from './query/task.query';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

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

  @Get('/')
  async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getTasks(query);
    return fillObject(TaskRdo, tasks);
  }

  @Get('/:userId/new')
  async getNew(@Param('userId') userId: string, @Query() query: TaskQuery) {
    const tasks = await this.taskService.getNewTasks(userId, query);
    return fillObject(TaskRdo, tasks);
  }

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
    status: HttpStatus.NO_CONTENT,
    description: 'The task has been successfully deleted.'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskService.deleteTask(id);
  }
}
