import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CommentRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор комментария.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  @Expose({name: 'id'})
  public id: string;

  @ApiProperty({
    description: 'Текст комментария.',
    example: 'Изи пизи лемон сквизи',
  })
  @Expose()
  public comment: string;

  @ApiProperty({
    description: 'Уникальный идентификатор задания.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  @Expose()
  public taskId: string;

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
}