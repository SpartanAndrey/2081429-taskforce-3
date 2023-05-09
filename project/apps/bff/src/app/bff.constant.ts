import { SortType } from "@project/shared/app-types";

export const DEFAULT_TASK_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_SORT_TYPE = SortType.CreatedAt;
export const MAX_TASK_TAG_NUMBER = 5;

export const enum FieldLength {
  MinTitle = 20,
  MaxTitle = 50,
  MinDescription = 100,
  MaxDescription = 1024,
  MinAddress = 10,
  MaxAddress = 255,
  MinTag = 3,
  MaxTag = 10
}

export const enum TaskValidation {
  TaskTitleLength = `Task title length shall be between ${FieldLength.MinTitle} and ${FieldLength.MaxTitle} chars.`,
  TaskDescriptionLength = `Task description length shall be between ${FieldLength.MinDescription} and ${FieldLength.MaxDescription} chars.`,
  TaskAddressLength = `Task address length shall be between ${FieldLength.MinAddress} and ${FieldLength.MaxAddress} chars.`,
  TaskTagLength = `Task tag length shall be between ${FieldLength.MinTag} and ${FieldLength.MinTag} chars.`,
  TaskTagsNumber = `Task tags number shall be no more than ${MAX_TASK_TAG_NUMBER}.`,
  TaskDuedateNotValid = 'The due date is not valid.'
}

export const MAX_USER_SPECIALIZATION_NUMBER = 5;

export const enum UserFieldLength {
  MinUser = 3,
  MaxUser = 50,
  MinPassword = 6,
  MaxPassword = 12,
  MaxUserInfo = 300,
}

export const enum UserValidation {
  AuthUserEmailNotValid = 'The email is not valid.',
  AuthUserDateBirthNotValid = 'The user date birth is not valid.',
  AuthUserNameLength = `User name length shall be between ${UserFieldLength.MinUser} and ${UserFieldLength.MaxUser} chars.`,
  AuthUserPasswordLength = `User password length shall be between ${UserFieldLength.MinPassword} and ${UserFieldLength.MaxPassword} chars.`,
  AuthUserInfoLength = `User info length shall no more than ${UserFieldLength.MaxUserInfo} chars.`,
  AuthUserMaxSpecializationNumber = `User specialization number shall no more than ${MAX_USER_SPECIALIZATION_NUMBER}.`
}

export const MIN_REVIEW_LENGTH = 50;
export const MAX_REVIEW_LENGTH = 500;

export const MIN_RATING = 1;
export const MAX_RATING = 5;

export const REVIEW_LENGTH = `Review length shall be between ${MIN_REVIEW_LENGTH} and ${MAX_REVIEW_LENGTH} chars.`
export const VALID_RATING = `Rating shall be between ${MIN_RATING} and ${MAX_RATING} chars.`

export const DEFAULT_COMMENT_COUNT_LIMIT = 50;

export const MIN_COMMENT_LENGTH = 10;
export const MAX_COMMENT_LENGTH = 300;

export const COMMENT_LENGTH = `Comment length shall be between ${MIN_COMMENT_LENGTH} and ${MAX_COMMENT_LENGTH} chars.`