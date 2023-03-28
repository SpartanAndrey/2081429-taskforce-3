import { Review } from '@project/shared/app-types';

export class ReviewEntity implements Review {
  public _id?: string;
  public review: string;
  public taskId: string;
  public rating: number;
  public userId: string;
  public createdAt: Date;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(review: Review) {
    this._id = review._id;
    this.review = review.review;
    this.taskId = review.taskId;
    this.rating = review.rating;
    this.userId = review.userId;
    this.createdAt = review.createdAt;
  }

}
