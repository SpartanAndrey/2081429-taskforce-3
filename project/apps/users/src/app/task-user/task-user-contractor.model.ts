import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserContractor } from '@project/shared/app-types';

@Schema()

export class TaskUserContractorModel extends Document implements UserContractor{
  @Prop({
    default: 0,
  })
  public age?: number;

  @Prop({
    default: 0,
  })
  public rating?: number;

  @Prop({
    default: 0,
  })
  public completedTasksCount?: number;

  @Prop({
    default: 0,
  })
  public failedTasksCount?: number;

  @Prop({
    default: '',
  })
  public personalInfo?: string;

  @Prop({
    default: '',
  })
  public specializations?: string[];

  @Prop({
    default: 0,
  })
  public ratingPlace?: number;

}

export const TaskUserContractorSchema = SchemaFactory.createForClass(TaskUserContractorModel);
