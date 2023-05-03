import { Task, TaskStatus, City } from '@project/shared/app-types';

export class TaskEntity implements Task {
  public id: number;
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
  public contractorId?: string;
  public createdAt: Date;
  public updatedAt?: Date;
  public status: TaskStatus;
  public responses?: string[];
  public responsesCount?: number;
  public commentsCount?: number;

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public fillEntity(task: Task) {
    this.title = task.title;
    this.description = task.description;
    this.categoryId = task.categoryId;
    this.price = task.price;
    this.dueDate = task.dueDate;
    this.image = task.image;
    this.address = task.address;
    this.tags = task.tags;
    this.city = task.city;
    this.userId = task.userId;
    this.contractorId = task.contractorId;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    this.status = task.status;
    this.responses = task.responses;
    this.responsesCount = task.responsesCount;
    this.commentsCount = task.commentsCount;
  }

  public toObject() {
    return {
      ...this
    };
  }

}