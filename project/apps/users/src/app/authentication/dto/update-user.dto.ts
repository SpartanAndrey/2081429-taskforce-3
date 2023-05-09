import { City } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString, Length, MaxLength, IsArray, ArrayMaxSize, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { MAX_USER_SPECIALIZATION_NUMBER, UserFieldLength, UserValidation } from '../authentication.constant';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Фамилия и имя пользователя. Минимальная длина поля: 3 символа, максимальная 50 символов.',
    example: 'Ivan Ivanov',
  })
  @Length(UserFieldLength.MinUser, UserFieldLength.MaxUser, { message: UserValidation.AuthUserNameLength })
  @IsString()
  @IsOptional()
  public fullName?: string;

  @ApiProperty({
    description: 'Дата рождения пользователя в формате: YYYY-MM-DD. Ограничения: валидная дата, пользователь достиг совершеннолетия (18 лет).',
    example: '2022-02-22',
  })
  @IsISO8601({}, { message: UserValidation.AuthUserDateBirthNotValid })
  @IsOptional()
  public dateBirth?: Date;

  @ApiProperty({
    description: 'Информация о себе. Максимальная длина: 300 символов',
    example: 'Ну я такой ничё работник.',
  })
  @MaxLength(UserFieldLength.MaxUserInfo, { message: UserValidation.AuthUserInfoLength })
  @IsString()
  @IsOptional()
  public personalInfo?: string;

  @ApiProperty({
    description: 'Список навыков пользователя (один или несколько вариантов). Ограничения: не больше 5 вариантов.',
    example: 'Москва'
  })
  @IsArray()
  @ArrayMaxSize(MAX_USER_SPECIALIZATION_NUMBER, { message: UserValidation.AuthUserMaxSpecializationNumber})
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