import { Category, TaskStatus, UserCity } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Заголовок. Минимальная длина 20 символов, максимальная 50.',
    example: 'Дверь мне запили. Срочно'
  })
  public title?: string;

  @ApiProperty({
    description: 'Описание. Минимальная длина 100 символов, максимальная: 1024 символа.',
    example: 'Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.'
  })
  public description?: string;

  @ApiProperty({
    description: 'Одна из существующих категорий.',
    example: 'Двери'
  })
  public category?: Category;

  @ApiProperty({
    description: 'Неотрицательное число. Сумма может быть произвольной, в том числе и нулём.',
    example: '1000'
  })
  public price?: number;

  @ApiProperty({
    description: 'Валидная дата для выполнения задания. Выбранная дата исполнения не может быть меньше текущей даты.',
    example: '2023-08-29'
  })
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
  public address?: string;

  @ApiProperty({
    description: 'Список тегов к заданию. ',
    example: 'запилить'
  })
  public tags?: string[];  

  @ApiProperty({
    description: 'Один город из списка: Москва, Санкт-Петербург, Владивосток.',
    example: 'Москва'
  })
  public city?: UserCity;

  @ApiProperty({
    description: 'Одно из пяти статусов: Новое, Отменено, В работе, Выполнено, Провалено.',
    example: 'Выполнено'
  })
  public status?: TaskStatus; 
}