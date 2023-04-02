import { Category } from './category.interface';
import { TaskStatus } from './task-status.enum';
import { UserCity } from './user-city.enum';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  category: Category;
  price?: number;
  dueDate?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city: UserCity;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
  status: TaskStatus;
  responses?: string[];
  responsesCount?: number;
  commentsCount?: number;
}