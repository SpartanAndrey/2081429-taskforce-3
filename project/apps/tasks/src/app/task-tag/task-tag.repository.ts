import { TaskTagEntity } from './task-tag.entity';
import { Tag} from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskTagRepository implements CRUDRepository<TaskTagEntity, number, Tag> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskTagEntity): Promise<Tag> {
    return this.prisma.tag.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(tagId: number): Promise<void> {
    await this.prisma.tag.delete({
      where: {
        tagId,
      }
    });
  }

  public findById(tagId: number): Promise<Tag | null> {
    return this.prisma.tag.findFirst({
      where: {
        tagId
      }
    });
  }

  public find(ids: number[] = []): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      where: {
        tagId: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(tagId: number, item: TaskTagEntity): Promise<Tag> {
    return this.prisma.tag.update({
      where: {
        tagId
      },
      data: { ...item.toObject(), tagId}
    });
  }
}
