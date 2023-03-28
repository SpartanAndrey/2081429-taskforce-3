import dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { TaskMemoryRepository } from './task-memory.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { TaskStatus } from '@project/shared/app-types';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskMemoryRepository
  ) {}

  public async create(dto: CreateTaskDto) {
    const task = {...dto, status: TaskStatus.New, userId: '', createdAt: dayjs('2023-03-26').toDate()};

    const taskEntity = await new TaskEntity(task);

    return this.taskRepository.create(taskEntity);
  }

  //добавить метод update


  public async getTask(id: string) {
    return this.taskRepository.findById(id);
  }

  public async delete(id: string) {
    return this.taskRepository.destroy(id);
  }
}
