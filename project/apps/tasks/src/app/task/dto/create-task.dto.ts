import { City } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString, Length, IsPositive, IsOptional, ArrayMaxSize } from 'class-validator';
import { Transform } from 'class-transformer';
import { MAX_TASK_TAG_NUMBER, FieldLength, TaskValidation } from '../task.constant';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Заголовок. Минимальная длина 20 символов, максимальная 50.',
    example: 'Дверь мне запили. Срочно',
    required: true
  })
  @Length(FieldLength.MinTitle, FieldLength.MaxTitle, { message: TaskValidation.TaskTitleLength })
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'Описание. Минимальная длина 100 символов, максимальная: 1024 символа.',
    example: 'Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.',
    required: true
  })
  @Length(FieldLength.MinDescription, FieldLength.MaxDescription, { message: TaskValidation.TaskDescriptionLength })
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
  @IsISO8601({}, { message: TaskValidation.TaskDuedateNotValid })
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
  @Length(FieldLength.MinAddress, FieldLength.MaxAddress, { message: TaskValidation.TaskAddressLength })
  @IsString()
  public address?: string;

  @ApiProperty({
    description: 'Список тегов к заданию.',
    example: ['запилить', 'пенёк']
  })
  @IsOptional()
  @ArrayMaxSize(MAX_TASK_TAG_NUMBER, {message: TaskValidation.TaskTagsNumber})
  @Length(FieldLength.MinTag, FieldLength.MaxTag, {each: true, message: TaskValidation.TaskTagLength})
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
