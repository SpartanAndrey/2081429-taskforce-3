import { City, UserRole } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsString, Length } from 'class-validator';
import { AUTH_USER_DATEBIRTH_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID, AUTH_USER_NAME_LENGTH, AUTH_USER_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, MAX_USER_LENGTH, MIN_PASSWORD_LENGTH, MIN_USER_LENGTH } from '../authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'Фамилия и имя пользователя. Минимальная длина поля: 3 символа, максимальная 50 символов.',
    example: 'Ivan Ivanov',
    required: true
  })
  @Length(MIN_USER_LENGTH, MAX_USER_LENGTH, { message: AUTH_USER_NAME_LENGTH })
  @IsString()
  public fullName: string;

  @ApiProperty({
    description: 'Используется в качестве логина. Адрес уникален: в базе данных не может быть двух пользователей с одинаковым email.',
    example: 'user@gmail.com',
    required: true
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'Один город из списка: Москва, Санкт-Петербург, Владивосток.',
    example: 'Москва'
  })
  public city: City;

  @ApiProperty({
    description: 'Пароль пользователя. Минимальная длина пароля 6 символов, максимальная 12.',
    example: '123456',
    required: true
  })
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, { message: AUTH_USER_PASSWORD_LENGTH })
  @IsString()
  public password: string;

  @ApiProperty({
    description: 'В приложении реализовано два вида ролей: «Заказчик» (публикует новые задания), «Исполнитель» (откликается на заявки).',
    example: 'Customer',
    required: true
  })
  public role: UserRole;

  @ApiProperty({
    description: 'Фотография для аватарки пользователя. Ограничения: не больше 500 килобайт, формат jpeg или png.',
    example: 'avatar.png'
  })
  public avatar?: string;

  @ApiProperty({
    description: 'Дата рождения пользователя в формате: YYYY-MM-DD. Ограничения: валидная дата, пользователь достиг совершеннолетия (18 лет).',
    example: '2022-02-22',
    required: true
  })
  @IsISO8601({}, { message: AUTH_USER_DATEBIRTH_NOT_VALID })
  public dateBirth: Date;
}
