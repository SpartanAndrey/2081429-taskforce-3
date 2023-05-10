import { City } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString, Length, IsPositive, IsOptional, ArrayMaxSize } from 'class-validator';
import { Transform } from 'class-transformer';
import { MAX_ADDRESS_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_TAG_LENGTH, MAX_TASK_TAG_NUMBER, MAX_TITLE_LENGTH, MIN_ADDRESS_LENGTH, MIN_DESCRIPTION_LENGTH, MIN_TAG_LENGTH, MIN_TITLE_LENGTH, TASK_ADDRESS_LENGTH, TASK_DESCRIPTION_LENGTH, TASK_DUEDATE_NOT_VALID, TASK_TAG_LENGTH, TASK_TAG_NUMBER, TASK_TITLE_LENGTH } from '../task.constant';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Заголовок. Минимальная длина 20 символов, максимальная 50.',
    example: 'Дверь мне запили. Срочно',
    required: true
  })
  @Length(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, { message: TASK_TITLE_LENGTH })
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'Описание. Минимальная длина 100 символов, максимальная: 1024 символа.',
    example: 'Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.',
    required: true
  })
  @Length(MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH, { message: TASK_DESCRIPTION_LENGTH })
  @IsString()
  public description: string;

  @ApiProperty({
    description: 'Уникальный идентификатор катгории задания.',
    example: 100
  })
  @Transform(({value}) => +value)
  public categoryId: number;

  @ApiProperty({
    description: 'Неотрицательное число. Сумма может быть произвольной, в том числе и нулём.',
    example: '1000'
  })
  @IsPositive()
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: 'Валидная дата для выполнения задания. Выбранная дата исполнения не может быть меньше текущей даты.',
    example: '2023-08-29'
  })
  @IsISO8601({}, { message: TASK_DUEDATE_NOT_VALID })
  @IsOptional()
  public dueDate?: Date;

  @ApiProperty({
    description: 'Максимальный размер изображения: 1 мегабайт. Допускаются форматы: jpg, png.',
    example: 'image.png'
  })
  @IsOptional()
  public image?: string;

  @ApiProperty({
    description: 'Адрес, где необходимо выполнять задание. Минимальная длина 10 символов, максимальная 255.',
    example: 'переулок Дверной запил, 21'
  })
  @IsOptional()
  @Length(MIN_ADDRESS_LENGTH, MAX_ADDRESS_LENGTH, { message: TASK_ADDRESS_LENGTH})
  @IsString()
  public address?: string;

  @ApiProperty({
    description: 'Список тегов к заданию.',
    example: ['запилить', 'пенёк']
  })
  @IsOptional()
  @ArrayMaxSize(MAX_TASK_TAG_NUMBER, {message: TASK_TAG_NUMBER})
  @Length(MIN_TAG_LENGTH, MAX_TAG_LENGTH, {each: true, message: TASK_TAG_LENGTH})
  tags?: string[]; 

  @ApiProperty({
    description: 'Один город из списка: Москва, Санкт-Петербург, Владивосток.',
    example: 'Москва'
  })
  public city: City;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
    })
    public userId: string;
}
