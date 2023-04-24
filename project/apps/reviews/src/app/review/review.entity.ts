import { Review } from '@project/shared/app-types';

export class ReviewEntity implements Review {
  public id: number;
  public review: string;
  public taskId: number;
  public rating: number;
  public userId: string;
  public contractorId: string;
  public createdAt: Date;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(review: Review) {
    this.id = review.id;
    this.review = review.review;
    this.taskId = review.taskId;
    this.rating = review.rating;
    this.userId = review.userId;
    this.contractorId = review.contractorId;
    this.createdAt = review.createdAt;
  }

}
