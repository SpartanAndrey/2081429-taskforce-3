export interface Comment {
  _id?: string;
  comment: string;
  taskId: string;
  userId: string;
  createdAt: Date;
}