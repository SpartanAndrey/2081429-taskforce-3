import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { UserFieldLength, UserValidation } from '../bff.constant';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Пароль пользователя. Минимальная длина пароля 6 символов, максимальная 12.',
    example: '123456',
    required: true
  })
  @Length(UserFieldLength.MinPassword, UserFieldLength.MaxPassword, { message: UserValidation.AuthUserPasswordLength })
  @IsString()
  public password: string;

  @ApiProperty({
    description: 'Новый пароль пользователя. Минимальная длина пароля 6 символов, максимальная 12.',
    example: '123456',
    required: true
  })
  @Length(UserFieldLength.MinPassword, UserFieldLength.MaxPassword, { message: UserValidation.AuthUserPasswordLength })
  @IsString()
  public newPassword: string;
}
