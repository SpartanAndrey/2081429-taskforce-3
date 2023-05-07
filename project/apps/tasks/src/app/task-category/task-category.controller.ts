import { TaskCategoryService } from './task-category.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { TaskCategoryRdo } from './rdo/task-category.rdo';
import CreateTaskCategoryDto from './dto/create-task-category.dto';
import UpdateTaskCategoryDto from './dto/update-task-category.dto';

@Controller('categories')
export class TaskCategoryController {
  constructor(
    private readonly taskCategoryService: TaskCategoryService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const existCategory = await this.taskCategoryService.getCategory(id);
    return fillObject(TaskCategoryRdo, existCategory);
  }

  @Get('/')
  async index() {
    const categories = await this.taskCategoryService.getCategories();
    return fillObject(TaskCategoryRdo, categories);
  }

  @Post('/')
  async create(@Body() dto: CreateTaskCategoryDto) {
    const newCategory = await this.taskCategoryService.createCategory(dto);
    return fillObject(TaskCategoryRdo, newCategory);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskCategoryService.deleteCategory(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateTaskCategoryDto) {
    const updatedCategory = await this.taskCategoryService.updateCategory(id, dto)
    return fillObject(TaskCategoryRdo, updatedCategory);
  }
}
