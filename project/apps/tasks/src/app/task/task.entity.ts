import { Category, Task, TaskStatus, UserCity } from '@project/shared/app-types';

export class TaskEntity implements Task {
  public _id?: string;
  public title: string;
  public description: string;
  public category: Category;
  public price?: number;
  public dueDate?: Date;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city: UserCity;
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

  public toObject() {
    return {...this};
  }

  public fillEntity(task: Task) {
    this._id = task._id;
    this.title = task.title;
    this.description = task.description;
    this.category = task.category;
    this.price = task.price;
    this.dueDate = task.dueDate;
    this.image = task.image;
    this.address = task.address;
    this.tags = task.tags;
    this.city = task.city;
    this.userId = task.userId;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    this.status = task.status;
    this.responses = task.responses;
    this.responsesCount = task.responsesCount;
    this.commentsCount = task.commentsCount;
  }

}