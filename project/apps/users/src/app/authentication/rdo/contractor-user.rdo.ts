import { Expose, Transform } from 'class-transformer';
import { City, UserRole } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';

export class ContractorUserRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Фамилия и имя пользователя.',
    example: 'Ivan Ivanov'
  })
  @Expose()
  public fullName: string;

  @ApiProperty({
    description: 'Электронная почта.',
    example: 'user@gmail.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Город.',
    example: 'Москва'
  })
  @Expose()
  public city: City;

  @ApiProperty({
    description: 'Вид/роль пользователя.',
    example: 'customer'
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'Фотография для аватарки пользователя.',
    example: 'avatar.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'Дата рождения.',
    example: '2022-02-22'
  })
  @Expose()
  public dateBirth: string;

  @ApiProperty()
  @Expose()
  age?: number;

  @ApiProperty()
  @Expose()
  rating?: number;

  @ApiProperty()
  @Expose()
  completedTasksCount?: number;

  @ApiProperty()
  @Expose()
  failedTasksCount?: number;

  @ApiProperty()
  @Expose()
  personalInfo?: string;

  @ApiProperty()
  @Expose()
  specializations?: string[];

  @ApiProperty()
  @Expose()
  ratingPlace?: number;
}