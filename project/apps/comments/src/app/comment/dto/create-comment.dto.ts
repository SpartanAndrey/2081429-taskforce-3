import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({
    description: 'Текст комментария. Минимальная длина: 10 символов, максимальная: 300.',
    example: 'Изи пизи лемон сквизи',
  })
  public comment: string;

  @ApiProperty({
    description: 'Уникальный идентификатор задания.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  public taskId: string;
}
