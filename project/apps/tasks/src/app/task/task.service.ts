import dayjs from 'dayjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '@project/shared/app-types';
import { TaskRepository } from './task.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { TaskQuery } from './query/task.query';
import { TASK_STATUS_CONDITIONS_WRONG } from './task.constant';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  async createTask(dto: CreateTaskDto) {

    const taskDto = {...dto, createdAt: dayjs('2023-03-26').toDate(), status: TaskStatus.New};
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

  async getNewTasks(userId: string, query: TaskQuery) {
    return this.taskRepository.find({ ...query, userId: userId, status: TaskStatus.New });
  }

  async getCustomerTasksNumber(userId: string, query: TaskQuery) {
    return this.taskRepository.countCustomerTasks({ ...query, userId: userId });
  }

  async getContratorTasksNumber(contractorId: string, query: TaskQuery) {
    return this.taskRepository.countContractorTasks({ ...query, contractorId: contractorId });
  }

  async updateTaskStatus(id: number, dto: UpdateTaskDto) {

    const task =  await this.taskRepository.findById(id);
   
    if (task.status === TaskStatus.New && task.userId === dto.userId) {
      return this.taskRepository.updateStatus(id, dto.status);
    } else if (task.status === TaskStatus.New && task.contractorId) {
      return this.taskRepository.updateStatus(id, dto.status);
    } else if (task.status === TaskStatus.InWork && task.userId === dto.userId)
    {
      return this.taskRepository.updateStatus(id, dto.status);
    } else if (task.status === TaskStatus.InWork && task.contractorId === dto.userId) {
      return this.taskRepository.updateStatus(id, dto.status);
    } else {
      throw new BadRequestException(TASK_STATUS_CONDITIONS_WRONG);
    }
  }
}
