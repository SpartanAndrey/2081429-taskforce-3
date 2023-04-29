import { Entity } from '@project/util/util-types';
import { Subscriber, UserRole } from '@project/shared/app-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string;
  public email: string;
  public fullName: string;
  public role: UserRole;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.fullName = entity.fullName;
    this.id = entity.id ?? '';
    this.role = entity.role;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
