import dayjs from 'dayjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from '@project/shared/app-types';
import { TaskRepository } from './task.repository';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository
  ) {}

  async createTask(dto: CreateTaskDto) { //походу не нужно определять тип возвращаеого объекта

    const taskDto = {...dto, userId: '', categoryId: 1, createdAt: dayjs('2023-03-26').toDate(), status: TaskStatus.New};
    const taskEntity = new TaskEntity(taskDto);
    return this.taskRepository.create(taskEntity);
  }

  async deleteTask(id: number): Promise<void> {
    this.taskRepository.destroy(id);
  }

  async getTask(id: number) {
    return this.taskRepository.findById(id);
  }

  async getTasks() {
    return this.taskRepository.find();
  }
}
