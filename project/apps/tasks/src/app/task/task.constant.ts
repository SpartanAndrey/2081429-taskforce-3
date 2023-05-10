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

export const TASK_FORBIDDEN  = 'Access is denied.';
export const TASK_STATUS_CONDITIONS_WRONG = 'Update status conditions are wrong.';
export const TASK_NOT_FOUND = 'Task is not found.';
export const TASK_CANT_TAKE = 'You\'re not contractor.';
export const TASK_RESPONSE_EXIST = 'You have already responsed this task.';
export const TASK_CONTRACTOR_EXIST = 'The contractor has been already appointed.';
export const TASK_NOT_AUTHOR= 'You\'re not owner of the task.';
export const TASK_CONTRACTOR_NOT_RESPONSE= 'This contractor doesn\'t response on your task.';
