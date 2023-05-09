import {ApiProperty} from "@nestjs/swagger";
import { Transform } from 'class-transformer';
import { IsInt, IsString, Length, Max, Min } from 'class-validator';
import { MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH, MIN_RATING, MAX_RATING, VALID_RATING, REVIEW_LENGTH } from "../bff.constant";

export class CreateReviewDto {
  @ApiProperty({
    description: 'Текст отзыва. Минимум 50 символов, максимум 500 символов.',
    example: 'Нраица, очень нраица.',
  })
  @Length(MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH, { message: REVIEW_LENGTH })
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
    description: 'Уникальный идентификатор пользователя.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  public userId: string;

  @ApiProperty({
    description: 'Оценка исполнителя. Число от 1 до 5.',
    example: '5'
  })
  @Min(MIN_RATING, { message: VALID_RATING })
  @Max(MAX_RATING, { message: VALID_RATING })
  @IsInt()
  public rating: number;
}
