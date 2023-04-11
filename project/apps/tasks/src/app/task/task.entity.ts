import { Task, TaskStatus, City } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class TaskEntity implements Entity<TaskEntity>, Task {
  public id?: number;
  public title: string;
  public description: string;
  public categoryId: number;
  public price?: number;
  public dueDate?: Date;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city: City;
  public userId: string;
  public createdAt: Date;
  public updatedAt?: Date;
  public status: TaskStatus;
  public responses?: string[];
  public responsesCount?: number;
  public commentsCount?: number;

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public fillEntity(entity: Task) {
    this.id = entity.id;
    this.title = entity.title;
    this.description = entity.description;
    this.categoryId = entity.categoryId;
    this.price = entity.price;
    this.dueDate = entity.dueDate;
    this.image = entity.image;
    this.address = entity.address;
    this.tags = entity.tags;
    this.city = entity.city;
    this.userId = entity.userId;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.status = entity.status;
    this.responses = entity.responses;
    this.responsesCount = entity.responsesCount;
    this.commentsCount = entity.commentsCount;
  }

  public toObject(): TaskEntity {
    return {...this};
  }

}