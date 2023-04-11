import dayjs from 'dayjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from '@project/shared/app-types';
import { TaskRepository } from './task.repository';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository
  ) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {

    const taskDto = {...dto, userId: '', categoryId: 1, createdAt: dayjs('2023-03-26').toDate(), status: TaskStatus.New};
    const taskEntity = new TaskEntity(taskDto);
    return this.taskRepository.create(taskEntity);
  }

  async deleteTask(id: number): Promise<void> {
    this.taskRepository.destroy(id);
  }

  async getTask(id: number): Promise<Task> {
    return this.taskRepository.findById(id);
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

}
