import dayjs from 'dayjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from '@project/shared/app-types';
import { TaskRepository } from './task.repository';
import { TaskTagRepository } from '../task-tag/task-tag.repository';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { TaskQuery } from './query/task.query';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskTagRepository: TaskTagRepository
  ) {}

  async createTask(dto: CreateTaskDto) {

    const tags = await this.taskTagRepository.find(dto.tags);
    const taskDto = {...dto, userId: '', categoryId: 1, createdAt: dayjs('2023-03-26').toDate(), status: TaskStatus.New, tags};
    const taskEntity = new TaskEntity(taskDto);
    return this.taskRepository.create(taskEntity);
  }

  async deleteTask(id: number): Promise<void> {
    this.taskRepository.destroy(id);
  }

  async getTask(id: number) {
    return this.taskRepository.findById(id);
  }

  async getTasks(query: TaskQuery) {
    return this.taskRepository.find(query);
  }
}
