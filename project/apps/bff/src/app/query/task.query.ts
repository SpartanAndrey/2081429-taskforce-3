import { City, TaskStatus, SortType } from '@project/shared/app-types';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_TASK_COUNT_LIMIT, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE } from '../tasks.constant';

export class TaskQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @IsOptional()
  public sortType?: SortType = DEFAULT_SORT_TYPE;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;

  @IsOptional()
  public categoryId: number;

  @IsOptional()
  public city?: City;

  @IsOptional()
  public status?: TaskStatus;

  @IsOptional()
  public tag?: string;

  @IsOptional()
  public userId?: string;

  @IsOptional()
  public contractorId?: string;
}