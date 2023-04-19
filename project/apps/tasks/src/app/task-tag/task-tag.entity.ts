import { Entity } from '@project/util/util-types';
import { Tag } from '@project/shared/app-types';

export class TaskTagEntity implements Entity<TaskTagEntity>, Tag {
  public tagId: number;
  public title: string;

  constructor(tag: Tag) {
    this.fillEntity(tag);
  }

  public fillEntity(entity: Tag) {
    this.title = entity.title;
    this.tagId = entity.tagId;
  }

  public toObject(): TaskTagEntity {
    return { ...this }
  }
}
