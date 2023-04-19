import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export default class TaskTagRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор тега.',
    example: '4353642828136379763',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Уникальное название тега.',
    example: 'Уборка'
  })
  @Expose()
  public title: string;
}
