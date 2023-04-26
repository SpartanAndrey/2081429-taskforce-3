import { Transform } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";
import { IsString, Length } from 'class-validator';
import { minCommentLength, maxCommentLength, COMMENT_LENGTH } from "../comment.constant";

export class CreateCommentDto {
  @ApiProperty({
    description: 'Текст комментария. Минимальная длина: 10 символов, максимальная: 300.',
    example: 'Изи пизи лемон сквизи',
    required: true
  })
  @Length(minCommentLength, maxCommentLength, { message: COMMENT_LENGTH })
  @IsString()
  public comment: string;

  @ApiProperty({
    description: 'Уникальный идентификатор задания.',
    example: '10',
    required: true,
  })
  @Transform(({ value } ) => +value)
  public taskId: number;
}
