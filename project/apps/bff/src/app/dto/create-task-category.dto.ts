import { ApiProperty } from '@nestjs/swagger';

export default class CreateTaskCategoryDto {
  @ApiProperty({
    description: 'Уникальное название категории.',
    example: 'Распил'
  })
  public title: string;
}
