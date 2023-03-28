import { Body, Controller, Post, Get, Delete, HttpCode, HttpStatus, Param  } from '@nestjs/common';
import { TaskService } from './task.service';
import { fillObject } from '@project/util/util-core';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRdo } from './rdo/task.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @Post('create')
  public async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.create(dto);
    return fillObject(TaskRdo, newTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The task found.'
  })
  @Get(':id')
  public async get(@Param('id') id: string) {
    const existTask = await this.taskService.getTask(id);

    return fillObject(TaskRdo, existTask);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The new task has been successfully deleted.'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.taskService.delete(id);
  }
}
