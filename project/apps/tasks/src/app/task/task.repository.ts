import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskEntity } from './task.entity';
import { Task } from '@prisma/client';

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskEntity): Promise<Task> {
    return this.prisma.task.create({
      data: { ...item.toObject()}
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

  public find(ids: number[] = []): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        taskId: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(taskId: number, item: TaskEntity): Promise<Task> {
    return this.prisma.task.update({
      where: {
        taskId
      },
      data: { ...item.toObject(), taskId}
    });
  }
}
