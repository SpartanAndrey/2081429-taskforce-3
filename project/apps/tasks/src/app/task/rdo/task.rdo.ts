import { Expose } from 'class-transformer';
import { Category, TaskStatus, City, Tag } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';

export class TaskRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор задания.',
    example: 300
  })
  @Expose({ name: '_id'})
  public id: number;

  @ApiProperty({
    description: 'Заголовок.',
    example: 'Дверь мне запили. Срочно'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Описание',
    example: 'Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.Запили дверь.'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Одна из существующих категорий.',
    example: 'Двери'
  })
  @Expose()
  public category: Category;

  @ApiProperty({
    description: 'Стоимость.',
    example: '1000'
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Валидная дата для выполнения задания.',
    example: '2023-08-29'
  })
  @Expose()
  public dueDate: Date;

  @ApiProperty({
    description: 'Изображение. Допускаются форматы: jpg, png.',
    example: 'image.png'
  })
  @Expose()
  public image: string;

  @ApiProperty({
    description: 'Адрес, где необходимо выполнять задание.',
    example: 'переулок Дверной запил, 21'
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'Список тегов к заданию. ',
    example: 'запилить'
  })
  @Expose()
  public tags: Tag[];  

  @ApiProperty({
    description: 'Один город из списка: Москва, Санкт-Петербург, Владивосток.',
    example: 'Москва'
  })
  @Expose()
  public city: City;

  @ApiProperty({
    description: 'Одно из пяти статусов: Новое, Отменено, В работе, Выполнено, Провалено.',
    example: 'Новое'
  })
  @Expose()
  public status: TaskStatus;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Дата создания.',
    example: '2023-03-27'
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Дата обновления.',
    example: '2023-03-27'
  })
  @Expose()
  public updatedAt: Date;

  @ApiProperty({
    description: 'Количество отликов исполнителей.',
    example: ''
  })
  @Expose()
  public responses: number;

  @ApiProperty({
    description: 'Количество комментариев пользователей.',
    example: ''
  })
  @Expose()
  public comments: number;
}
