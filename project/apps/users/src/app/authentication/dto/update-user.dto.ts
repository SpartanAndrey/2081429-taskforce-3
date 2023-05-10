import { City } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString, Length, MaxLength, IsArray, ArrayMaxSize, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { AUTH_USER_DATEBIRTH_NOT_VALID, AUTH_USER_INFO_LENGTH, AUTH_USER_MAX_SPECIALIZATION_NUMBER, AUTH_USER_NAME_LENGTH, MAX_USER_INFO, MAX_USER_LENGTH, MAX_USER_SPECIALIZATION_NUMBER, MIN_USER_LENGTH } from '../authentication.constant';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Фамилия и имя пользователя. Минимальная длина поля: 3 символа, максимальная 50 символов.',
    example: 'Ivan Ivanov',
  })
  @Length(MIN_USER_LENGTH, MAX_USER_LENGTH, { message: AUTH_USER_NAME_LENGTH })
  @IsString()
  @IsOptional()
  public fullName?: string;

  @ApiProperty({
    description: 'Дата рождения пользователя в формате: YYYY-MM-DD. Ограничения: валидная дата, пользователь достиг совершеннолетия (18 лет).',
    example: '2022-02-22',
  })
  @IsISO8601({}, { message: AUTH_USER_DATEBIRTH_NOT_VALID})
  @IsOptional()
  public dateBirth?: Date;

  @ApiProperty({
    description: 'Информация о себе. Максимальная длина: 300 символов',
    example: 'Ну я такой ничё работник.',
  })
  @MaxLength(MAX_USER_INFO, { message: AUTH_USER_INFO_LENGTH })
  @IsString()
  @IsOptional()
  public personalInfo?: string;

  @ApiProperty({
    description: 'Список навыков пользователя (один или несколько вариантов). Ограничения: не больше 5 вариантов.',
    example: 'Москва'
  })
  @IsArray()
  @ArrayMaxSize(MAX_USER_SPECIALIZATION_NUMBER, { message: AUTH_USER_MAX_SPECIALIZATION_NUMBER})
  @Transform(({ value }) => new Set(value.map(item => item.toLowerCase())))
  @IsOptional()
  public specializations?: string[];

  @ApiProperty({
    description: 'Один город из списка: Москва, Санкт-Петербург, Владивосток.',
    example: 'Москва'
  })
  @IsOptional()
  public city?: City;

  @ApiProperty({
    description: 'Фотография для аватарки пользователя. Ограничения: не больше 500 килобайт, формат jpeg или png.',
    example: 'avatar.png'
  })
  @IsOptional()
  public avatar?: string;

}