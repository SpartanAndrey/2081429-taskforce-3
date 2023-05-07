import CreateTaskCategoryDto from './dto/create-task-category.dto';
import { Category } from '@project/shared/app-types';
import { TaskCategoryRepository } from './task-category.repository';
import { Injectable } from '@nestjs/common';
import { TaskCategoryEntity } from './task-category.entity';
import UpdateTaskCategoryDto from './dto/update-task-category.dto';

@Injectable()
export class TaskCategoryService {
  constructor(
    private readonly taskCategoryRepository: TaskCategoryRepository
  ) {}

  async createCategory(dto: CreateTaskCategoryDto): Promise<Category> {
    const categoryEntity = new TaskCategoryEntity(dto);
    return this.taskCategoryRepository.create(categoryEntity);
  }

  async deleteCategory(id: number): Promise<void> {
    this.taskCategoryRepository.destroy(id);
  }

  async getCategory(id: number): Promise<Category> {
    return this.taskCategoryRepository.findById(id);
  }

  async getCategories(): Promise<Category[]> {
    return this.taskCategoryRepository.find();
  }

  async updateCategory(id: number, dto: UpdateTaskCategoryDto): Promise<Category> {
    return this.taskCategoryRepository.update(id, new TaskCategoryEntity(dto));
  }
}
