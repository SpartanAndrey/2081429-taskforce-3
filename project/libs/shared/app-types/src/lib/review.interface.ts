export interface Review {
  _id?: string;
  review: string;
  taskId: string;
  rating: number;
  userId: string;
  createdAt: Date;
}