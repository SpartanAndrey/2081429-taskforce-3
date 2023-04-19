import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from '@project/shared/app-types';
import { TaskTagRepository } from './task-tag.repository';
import { Injectable } from '@nestjs/common';
import { TaskTagEntity } from './task-tag.entity';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TaskTagService {
  constructor(
    private readonly taksTagRepository: TaskTagRepository
  ) {}

  async createTag(dto: CreateTagDto): Promise<Tag> {
    const categoryEntity = new TaskTagEntity(dto);
    return this.taksTagRepository.create(categoryEntity);
  }

  async deleteTag(id: number): Promise<void> {
    this.taksTagRepository.destroy(id);
  }

  async getTag(id: number): Promise<Tag> {
    return this.taksTagRepository.findById(id);
  }

  async getTags(): Promise<Tag[]> {
    return this.taksTagRepository.find();
  }

  async updateTag(id: number, dto: UpdateTagDto): Promise<Tag> {
    return this.taksTagRepository.update(id, new TaskTagEntity(dto));
  }
}
