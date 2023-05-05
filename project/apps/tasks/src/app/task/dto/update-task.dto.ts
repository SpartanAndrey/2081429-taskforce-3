import { TaskStatus } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Одно из пяти статусов: Новое, Отменено, В работе, Выполнено, Провалено.',
    example: 'Новое'
  })
  public status: TaskStatus;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  public userId: string;
}
