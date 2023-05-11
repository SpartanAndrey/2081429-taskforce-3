import { SortType } from "@project/shared/app-types";

export const DEFAULT_TASK_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_SORT_TYPE = SortType.CreatedAt;
export const MAX_TASK_TAG_NUMBER = 5;

export const MIN_TITLE_LENGTH = 20;
export const MAX_TITLE_LENGTH = 50;
export const MIN_DESCRIPTION_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 1024;
export const MIN_ADDRESS_LENGTH = 10;
export const MAX_ADDRESS_LENGTH = 255;
export const MIN_TAG_LENGTH = 3;
export const MAX_TAG_LENGTH = 10;


export const TASK_TITLE_LENGTH = `Task title length shall be between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH} chars.`;
export const TASK_DESCRIPTION_LENGTH = `Task description length shall be between ${MIN_DESCRIPTION_LENGTH} and ${MAX_DESCRIPTION_LENGTH} chars.`;
export const TASK_ADDRESS_LENGTH = `Task address length shall be between ${MIN_ADDRESS_LENGTH} and ${MAX_ADDRESS_LENGTH} chars.`;
export const TASK_TAG_LENGTH = `Task tag length shall be between ${MIN_TAG_LENGTH} and ${MAX_TAG_LENGTH} chars.`;
export const TASK_TAG_NUMBER = `Task tags number shall be no more than ${MAX_TASK_TAG_NUMBER}.`;
export const TASK_DUEDATE_NOT_VALID = 'The due date is not valid.';

export const MAX_USER_SPECIALIZATION_NUMBER = 5;
export const MIN_USER_LENGTH = 3;
export const MAX_USER_LENGTH = 50;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 12;
export const MAX_USER_INFO = 300;

export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid.';
export const AUTH_USER_DATEBIRTH_NOT_VALID = 'The user date birth is not valid.';
export const AUTH_USER_NAME_LENGTH = `User name length shall be between ${MIN_USER_LENGTH} and ${MAX_USER_LENGTH} chars.`;
export const AUTH_USER_PASSWORD_LENGTH = `User password length shall be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} chars.`;
export const AUTH_USER_INFO_LENGTH = `User info length shall no more than ${MAX_USER_INFO} chars.`;
export const AUTH_USER_MAX_SPECIALIZATION_NUMBER = `User specialization number shall no more than ${MAX_USER_SPECIALIZATION_NUMBER}.`;

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

export const TASK_NOT_OWNER = 'You\'re not the author of this task.';
export const TASK_NOT_COMPLETED = 'The task has not completed yet.';
export const TASK_HAS_REVIEW = 'You have already left a review.';
export const TASK_NOT_FOUND = 'Task is not found.';
export const CATEGORY_ALREADY_FOUND = 'The category has already exists.';
export const USER_NOT_CUSTOMER = 'You are not Customer.';
export const USER_NOT_CONTRACTOR = 'You are not Contractor.';
