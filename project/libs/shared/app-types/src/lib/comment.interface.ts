export interface Comment {
  id?: number;
  comment: string;
  taskId: number;
  userId: string;
  createdAt: Date;
}