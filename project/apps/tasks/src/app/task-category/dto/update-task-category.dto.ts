import { ApiProperty } from '@nestjs/swagger';

export default class UpdateTaskCategoryDto {
  @ApiProperty({
    description: 'Уникальное название категории.',
    example: 'Распил'
  })
  public title: string;
}
