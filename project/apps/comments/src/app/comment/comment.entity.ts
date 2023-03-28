import { Comment } from '@project/shared/app-types';

export class CommentEntity implements Comment {
  public _id?: string;
  public comment: string;
  public taskId: string;
  public userId: string;
  public createdAt: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: Comment) {
    this._id = comment._id;
    this.comment = comment.comment;
    this.taskId = comment.taskId;
    this.userId = comment.userId;
    this.createdAt = comment.createdAt;
  }

}
