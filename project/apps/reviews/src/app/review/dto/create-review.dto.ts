import {ApiProperty} from "@nestjs/swagger";
import { Transform } from 'class-transformer';
import { IsInt, IsString, Length, Max, Min } from 'class-validator';
import { minReviewLength, maxReviewLength, minRating, maxRating, VALID_RATING, REVIEW_LENGTH } from "../review.constant";

export class CreateReviewDto {
  @ApiProperty({
    description: 'Текст отзыва. Минимум 50 символов, максимум 500 символов.',
    example: 'Нраица, очень нраица.',
  })
  @Length(minReviewLength, maxReviewLength, { message: REVIEW_LENGTH })
  @IsString()
  public review: string;

  @ApiProperty({
    description: 'Уникальный идентификатор задания.',
    example: '10'
  })
  @Transform(({value}) => +value)
  public taskId: number;

  @ApiProperty({
    description: 'Уникальный идентификатор исполнителя.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  public contractorId: string;

  @ApiProperty({
    description: 'Оценка исполнителя. Число от 1 до 5.',
    example: '5'
  })
  @Min(minRating, { message: VALID_RATING })
  @Max(maxRating, { message: VALID_RATING })
  @IsInt()
  public rating: number;
}
