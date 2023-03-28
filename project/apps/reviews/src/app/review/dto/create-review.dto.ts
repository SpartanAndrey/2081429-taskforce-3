import {ApiProperty} from "@nestjs/swagger";

export class CreateReviewDto {
  @ApiProperty({
    description: 'Текст отзыва. Минимум 50 символов, максимум 500 символов.',
    example: 'Нраица, очень нраица.',
  })
  public review: string;

  @ApiProperty({
    description: 'Уникальный идентификатор задания.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  public taskId: string;

  @ApiProperty({
    description: 'Оценка исполнителя. Число от 1 до 5.',
    example: '5'
  })
  public rating: number;
}
