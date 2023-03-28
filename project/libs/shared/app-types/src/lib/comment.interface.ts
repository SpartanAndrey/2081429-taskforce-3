export interface Comment {
  id?: number;
  comment: string;
  taskId: string;
  userId: string;
  createdAt?: Date;
}