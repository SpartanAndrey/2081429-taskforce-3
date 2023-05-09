import { City, UserRole } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsString, Length } from 'class-validator';
import { UserFieldLength, UserValidation } from '../authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'Фамилия и имя пользователя. Минимальная длина поля: 3 символа, максимальная 50 символов.',
    example: 'Ivan Ivanov',
    required: true
  })
  @Length(UserFieldLength.MinUser, UserFieldLength.MaxUser, { message: UserValidation.AuthUserNameLength })
  @IsString()
  public fullName: string;

  @ApiProperty({
    description: 'Используется в качестве логина. Адрес уникален: в базе данных не может быть двух пользователей с одинаковым email.',
    example: 'user@gmail.com',
    required: true
  })
  @IsEmail({}, { message: UserValidation.AuthUserEmailNotValid })
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
  @Length(UserFieldLength.MinPassword, UserFieldLength.MaxPassword, { message: UserValidation.AuthUserPasswordLength })
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
  @IsISO8601({}, { message: UserValidation.AuthUserDateBirthNotValid })
  public dateBirth: Date;
}
