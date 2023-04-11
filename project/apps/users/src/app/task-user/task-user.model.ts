import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserRole, City } from '@project/shared/app-types';

@Schema({
    collection: 'users',
    timestamps: true,
    discriminatorKey: 'role',
  })

export class TaskUserModel extends Document implements User {
  @Prop({
    required: true,
  })
  public fullName: string;

  @Prop({
    required: true,
  })
  public email: string;

  @Prop({
    required: true,
    type: String,
    enum: City,
    default: City.MSK,
  })
  public city: City;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Customer,
  })
  public role: UserRole;

  @Prop()
  public avatar?: string;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

}

export const TaskUserSchema = SchemaFactory.createForClass(TaskUserModel);
