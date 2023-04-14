import { TaskStatus } from './task-status.enum';
import { City } from './city.enum';

export interface Task {
  id?: number;
  title: string;
  description: string;
  categoryId: number;
  price?: number;
  dueDate?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city: City;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
  status: TaskStatus;
  responses?: string[];
  responsesCount?: number;
  commentsCount?: number;
}