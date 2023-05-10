import { TaskStatus } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({
    description: 'Одно из пяти статусов: Новое, Отменено, В работе, Выполнено, Провалено.',
    example: 'Новое'
  })
  public status: TaskStatus;
}
