import { TaskTagService } from './task-tag.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import TaskTagRdo from './rdo/tag.rdo';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TaskTagController {
  constructor(
    private readonly taskTagService: TaskTagService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const existTag = await this.taskTagService.getTag(id);
    return fillObject(TaskTagRdo, existTag);
  }

  @Get('/')
  async index() {
    const tags = await this.taskTagService.getTags();
    return fillObject(TaskTagRdo, tags);
  }

  @Post('/')
  async create(@Body() dto: CreateTagDto) {
    const newTag = await this.taskTagService.createTag(dto);
    return fillObject(TaskTagRdo, newTag);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskTagService.deleteTag(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateTagDto) {
    const updatedTag = await this.taskTagService.updateTag(id, dto)
    return fillObject(TaskTagRdo, updatedTag);
  }
}
