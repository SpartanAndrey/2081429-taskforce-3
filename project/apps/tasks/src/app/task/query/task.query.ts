import { City, TaskStatus } from '@project/shared/app-types';
import { IsIn, IsNumber, IsOptional, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_TASK_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../task.constant';

export class TaskQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @IsOptional()
  public categoryId?: number;

  @IsOptional()
  public city?: City;

  @IsOptional()
  public status?: TaskStatus;

  @Transform(({ value }) => value.split(',').map((tagId) => +tagId))
  @IsArray({})
  @IsOptional()
  public tags?: number[];
}