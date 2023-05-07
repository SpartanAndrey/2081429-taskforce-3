import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TaskCategoryRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор категории.',
    example: 100
  })
  @Expose()
  public categoryId: number;

  @ApiProperty({
    description: 'Уникальное название категории.',
    example: 'Распил'
  })
  @Expose()
  public title: string;
}