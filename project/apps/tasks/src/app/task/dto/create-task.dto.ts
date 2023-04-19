import { City } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString, Length, IsPositive } from 'class-validator';
import { TASK_TITLE_LENGTH, TASK_DESCRIPTION_LENGTH, TASK_ADDRESS_LENGTH, TASK_DUEDATE_NOT_VALID, minTitleLength, maxTitleLength, 
  minDescriptionLength, maxDescriptionLength, minAddressLength, maxAddressLength } from '../task.constant';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Заголовок. Минимальная длина 20 символов, максимальная 50.',
    example: 'Дверь мне запили. Срочно',
    required: true
  })
  @Length(minTitleLength, maxTitleLength, { message: TASK_TITLE_LENGTH })
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'Описание. Минимальная длина 100 символов, максимальная: 1024 символа.',
    example: 'Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.',
    required: true
  })
  @Length(minDescriptionLength, maxDescriptionLength, { message: TASK_DESCRIPTION_LENGTH })
  @IsString()
  public description: string;

  @ApiProperty({
    description: 'Уникальный идентификатор одной из существующих категорий.',
    example: '3452347234'
  })
  public categoryId: number;

  @ApiProperty({
    description: 'Неотрицательное число. Сумма может быть произвольной, в том числе и нулём.',
    example: '1000'
  })
  @IsPositive()
  public price?: number;

  @ApiProperty({
    description: 'Валидная дата для выполнения задания. Выбранная дата исполнения не может быть меньше текущей даты.',
    example: '2023-08-29'
  })
  @IsISO8601({}, { message: TASK_DUEDATE_NOT_VALID })
  public dueDate?: Date;

  @ApiProperty({
    description: 'Максимальный размер изображения: 1 мегабайт. Допускаются форматы: jpg, png.',
    example: 'image.png'
  })
  public image?: string;

  @ApiProperty({
    description: 'Адрес, где необходимо выполнять задание. Минимальная длина 10 символов, максимальная 255.',
    example: 'переулок Дверной запил, 21'
  })
  @Length(minAddressLength, maxAddressLength, { message: TASK_ADDRESS_LENGTH })
  @IsString()
  public address?: string;

  @ApiProperty({
    description: 'Список тегов к заданию.',
    example: ['2344234']
  })
  tags?: number[]; 

  @ApiProperty({
    description: 'Один город из списка: Москва, Санкт-Петербург, Владивосток.',
    example: 'Москва'
  })
  public city: City;
}