import { User, City, UserRole } from '@project/shared/app-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './task-user.constant';

export class TaskUserEntity implements User {
  public _id?: string;
  public fullName: string;
  public email: string;
  public city: City;
  public passwordHash: string;
  public role: UserRole;
  public avatar?: string;
  public dateBirth: Date;
  public publishedTasksCount?: number;
  public newTasksCount?: number;
  public personalInfo?: string;
  public age?: number;
  public rating?: number;
  public completedTasksCount?: number;
  public failedTasksCount?: number;
  public specialization?: string;
  public ratingPlace?: number;

  constructor(taskUser: User) {
    this.fillEntity(taskUser);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(taskUser: User) {
    this._id = taskUser._id;
    this.fullName = taskUser.fullName;
    this.email = taskUser.email;
    this.city = taskUser.city;
    this.passwordHash = taskUser.passwordHash;
    this.role = taskUser.role;
    this.avatar = taskUser.avatar;
    this.dateBirth = taskUser.dateBirth;
    this.publishedTasksCount = taskUser.publishedTasksCount;
    this.newTasksCount = taskUser.newTasksCount;
    this.personalInfo = taskUser.personalInfo;
    this.age = taskUser.age;
    this.rating = taskUser.rating;
    this.completedTasksCount = taskUser.completedTasksCount;
    this.failedTasksCount = taskUser.failedTasksCount;
    this.specialization = taskUser.specialization;
    this.ratingPlace = taskUser.ratingPlace;
  }

  public async setPassword(password: string): Promise<TaskUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}