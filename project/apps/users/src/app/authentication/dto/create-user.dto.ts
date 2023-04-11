import { City, UserRole } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Фамилия и имя пользователя. Минимальная длина поля: 3 символа, максимальная 50 символов.',
    example: 'Ivan Ivanov'
  })
  public fullName: string;

  @ApiProperty({
    description: 'Используется в качестве логина. Адрес уникален: в базе данных не может быть двух пользователей с одинаковым email.',
    example: 'user@gmail.com'
  })
  public email: string;

  @ApiProperty({
    description: 'Один город из списка: Москва, Санкт-Петербург, Владивосток.',
    example: 'Москва'
  })
  public city: City;

  @ApiProperty({
    description: 'Пароль пользователя. Минимальная длина пароля 6 символов, максимальная 12.',
    example: '123456'
  })
  public password: string;

  @ApiProperty({
    description: 'В приложении реализовано два вида ролей: «Заказчик» (публикует новые задания), «Исполнитель» (откликается на заявки).',
    example: 'customer'
  })
  public role: UserRole;

  @ApiProperty({
    description: 'Фотография для аватарки пользователя. Ограничения: не больше 500 килобайт, формат jpeg или png.',
    example: 'avatar.png'
  })
  public avatar?: string;

  @ApiProperty({
    description: 'Дата рождения пользователя в формате: YYYY-MM-DD. Ограничения: валидная дата, пользователь достиг совершеннолетия (18 лет).',
    example: '2022-02-22'
  })
  public dateBirth: Date;
}
