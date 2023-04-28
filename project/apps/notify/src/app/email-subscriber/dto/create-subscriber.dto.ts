import { IsEmail, IsNotEmpty } from 'class-validator';
import { EMAIL_NOT_VALID, NAME_IS_EMPTY } from '../email-subscriber.constant';
import { UserRole } from '@project/shared/app-types';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: NAME_IS_EMPTY })
  public fullName: string;

  public role: UserRole;
}
