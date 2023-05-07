import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { AUTH_USER_PASSWORD_LENGTH, minPasswordLength, maxPasswordLength } from '../authentication.constant';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Пароль пользователя. Минимальная длина пароля 6 символов, максимальная 12.',
    example: '123456',
    required: true
  })
  @Length(minPasswordLength, maxPasswordLength, { message: AUTH_USER_PASSWORD_LENGTH })
  @IsString()
  public password: string;

  @ApiProperty({
    description: 'Новый пароль пользователя. Минимальная длина пароля 6 символов, максимальная 12.',
    example: '123456',
    required: true
  })
  @Length(minPasswordLength, maxPasswordLength, { message: AUTH_USER_PASSWORD_LENGTH })
  @IsString()
  public newPassword: string;
}
