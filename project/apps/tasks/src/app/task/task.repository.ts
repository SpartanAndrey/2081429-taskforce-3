import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskEntity } from './task.entity';
import { Task } from '@prisma/client';
import { TaskQuery } from './query/task.query';

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();
    return this.prisma.task.create({
      data: {
        ...entityData,
      },
    });
  }

  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        taskId,
      }
    });
  }

  public findById(taskId: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        taskId
      }
    });
  }

  public find({limit, sortDirection, page, city, status, tag}: TaskQuery): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        status: status,
        city: city,
        tags: {
          has: tag,
        },
      },
      take: limit,
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(taskId: number, item: TaskEntity): Promise<Task> {
    return Promise.resolve(undefined);
  }
}
