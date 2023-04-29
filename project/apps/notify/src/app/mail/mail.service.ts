import { Subscriber } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_NEW_TASK_SUBJECT } from './mail.constant';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.fullName}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNotifyAllSubscribers(subscribers: Subscriber[]) {
    for (const subscriber of subscribers) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_NEW_TASK_SUBJECT,
      template: './new-task',
      context: {
        user: `${subscriber.fullName}`,
      }
    })
  }
  }
}
