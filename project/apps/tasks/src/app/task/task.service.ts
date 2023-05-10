import dayjs from 'dayjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AddTaskResponseDto } from './dto/add-task-response.dto';
import { SortType, TaskStatus } from '@project/shared/app-types';
import { TaskRepository } from './task.repository';
import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { TaskQuery } from './query/task.query';
import { TASK_CONTRACTOR_EXIST, TASK_CONTRACTOR_NOT_RESPONSE, TASK_FORBIDDEN, TASK_NOT_AUTHOR, TASK_NOT_FOUND, TASK_STATUS_CONDITIONS_WRONG } from './task.constant';
import { AddTaskContractorDto } from './dto/add-task-contractor.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  async createTask(dto: CreateTaskDto) {

    const taskDto = {...dto, createdAt: dayjs().toDate(), status: TaskStatus.New};
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

  async getNewTasks(query: TaskQuery) {
    return this.taskRepository.find({ ...query, status: TaskStatus.New });
  }

  async getCustomerTasks(userId: string, query: TaskQuery) {
    return this.taskRepository.find({ ...query, userId: userId, sortType: SortType.CreatedAt });
  }

  async getCustomerTasksNumber(userId: string, query: TaskQuery) {
    return this.taskRepository.countCustomerTasks({ ...query, userId: userId });
  }

  async getContractorTasks(userId: string, query: TaskQuery) {
    return this.taskRepository.find({ ...query, contractorId: userId, sortType: SortType.Status });
  }

  async getContractorTasksNumber(contractorId: string, query: TaskQuery) {
    return this.taskRepository.countContractorTasks({ ...query, contractorId: contractorId });
  }

  async updateTaskStatus(id: number, dto: UpdateTaskStatusDto) {

    const task =  await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    if (dto.userId !== task.userId && dto.userId !== task.contractorId) {
      throw new ForbiddenException(TASK_FORBIDDEN);
    }
   
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

  public async addContractor(id: number, dto: AddTaskContractorDto) {
    const { userId, contractorId } = dto;
    
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    if (userId !== task.userId) {
      throw new ForbiddenException(TASK_NOT_AUTHOR);
    }

    if (task.contractorId !== null) {
      throw new ForbiddenException(TASK_CONTRACTOR_EXIST);
    }

    if (!task.responses.includes(contractorId)) {
      throw new ForbiddenException(TASK_CONTRACTOR_NOT_RESPONSE)
    }

    return this.taskRepository.addContractor(id, contractorId);
  }

  public async addResponse(id: number, dto: AddTaskResponseDto) {
    const { userId } = dto;

    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    if (task.responses.includes(userId)) {
      throw new ForbiddenException(TASK_FORBIDDEN);
    }

    return await this.taskRepository.addResponse(id, userId);
  }
}
